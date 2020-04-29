const pg = require('pg');
const util = require('util');
const { omit } = require('lodash');
// Use exec as a promise to be able to await it
const exec = util.promisify(require('child_process').exec);

const dataAccess = require('./data-access');

const resetDatabase = async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  await pool.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
};

const migrateDatabase = async () => {
  const { stdout, stderr } = await exec('npm run migrate');
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stdout:', stdout);
  // eslint-disable-next-line no-console
  console.log('migrateDatabase--stderr:', stderr);
};

describe('getChannels', () => {
  beforeEach(async () => {
    await resetDatabase();
    await migrateDatabase();
  });

  it('returns all channels', async () => {
    const channels = await dataAccess.getChannels();
    expect(channels.map(channel => channel.name)).toMatchInlineSnapshot(`
      Array [
        "general",
        "random",
      ]
    `);
  });
});

describe('getMessages', () => {
  it('returns messages in chronological order', async () => {
    await dataAccess.createUser('arnaud', '');
    const arnaudId = await dataAccess.getVerifiedUserId('arnaud', '');
    await dataAccess.createUser('monia', '');
    const moniaId = await dataAccess.getVerifiedUserId('monia', '');

    await dataAccess.createMessage(
      1,
      'bonjour',
      arnaudId,
      '{"title": "Newspaper"}'
    );
    await dataAccess.createMessage(1, 'hello', moniaId, '{}');
    await dataAccess.createMessage(1, 'salut', arnaudId, '{}');

    const result = await dataAccess.getMessages(1);
    expect(result.messages.map(message => omit(message, ['created_at'])))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "salut",
          "extra_info": "{}",
          "id": 11,
          "id_chan": 1,
          "total_count": "3",
          "username": "arnaud",
        },
        Object {
          "content": "hello",
          "extra_info": "{}",
          "id": 10,
          "id_chan": 1,
          "total_count": "3",
          "username": "monia",
        },
        Object {
          "content": "bonjour",
          "extra_info": "{\\"title\\": \\"Newspaper\\"}",
          "id": 9,
          "id_chan": 1,
          "total_count": "3",
          "username": "arnaud",
        },
      ]
    `);
  });
});
