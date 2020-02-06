const pg = require('pg');
const util = require('util');
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
  beforeAll(async () => {
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

    await dataAccess.createMessage(1, 'bonjour', arnaudId);
    await dataAccess.createMessage(1, 'hello', moniaId);
    await dataAccess.createMessage(1, 'salut', arnaudId);

    const messages = await dataAccess.getMessages(1);
    expect(messages).toMatchInlineSnapshot(`
Array [
  Object {
    "content": "bonjour",
    "id": 9,
    "id_chan": 1,
    "username": "arnaud",
  },
  Object {
    "content": "hello",
    "id": 10,
    "id_chan": 1,
    "username": "monia",
  },
  Object {
    "content": "salut",
    "id": 11,
    "id_chan": 1,
    "username": "arnaud",
  },
]
`);
  });
});
