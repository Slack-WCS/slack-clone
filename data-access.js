/* eslint-disable no-console */
const pool = require('./db_pool');
const { UnknownError } = require('./utils');

const getChannels = async () => {
  const channels = await pool.query('SELECT * FROM channel ORDER BY id ASC');
  return channels.rows;
};

const getMessages = async (channelId, offset) => {
  const messages = await pool.query(
    // ne pas choisir users.id dans le select car il n'est pas unique alors que messages.id SI

    `
    SELECT 
      messages.id, 
      content, 
      id_chan, 
      created_at, 
      username,
      extra_info,
      COUNT(*) OVER() AS total_count 
    FROM messages
      JOIN users
      ON messages.user_id = users.id
      WHERE id_chan = $1
      ORDER BY messages.created_at DESC
      LIMIT 10 OFFSET $2;
    `,
    [channelId, offset]
  );
  return {
    messages: messages.rows,
    totalCount: messages.rows.length ? messages.rows[0].total_count : 0,
  };
};

const getUserFromSessionId = async sessionId => {
  const result = await pool.query(
    `
    SELECT users.id AS id, username FROM users
      JOIN session
      ON session.user_id = users.id
    WHERE session.session_id = $1
    `,
    [sessionId]
  );
  const user = result.rows[0];
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  return user;
};

const createUser = async (username, password) => {
  try {
    await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, crypt($2, gen_salt('bf')))`,
      [username, password]
    );
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Username is already taken.');
    }
    console.error(error);
    throw new UnknownError();
  }
};

const getVerifiedUserId = async (username, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE username = $1 AND password = crypt($2, password)',
    [username, password]
  );
  return result.rows[0].id;
};

const createSession = async userId => {
  const result = await pool.query(
    'INSERT INTO session (user_id) VALUES ($1) RETURNING session_id',
    [userId]
  );
  return result.rows[0].session_id;
};

const createChannel = async nameChannels => {
  await pool.query(`INSERT INTO channel (name) VALUES ($1)`, [nameChannels]);
};

const createMessage = async (channelId, contentMessage, user, extraInfo) => {
  const result = await pool.query(
    `INSERT INTO messages (id_chan, content, user_id, extra_info) VALUES ($1, $2, $3, $4) RETURNING *`,
    [channelId, contentMessage, user, extraInfo]
  );
  return result.rows[0];
};

const getMessage = async messageId => {
  const result = await pool.query(
    `
    SELECT
      messages.id, 
      content, 
      id_chan,
      created_at, 
      username,
      extra_info
    FROM messages
    JOIN users
    ON users.id = messages.user_id
    WHERE messages.id = $1
  `,
    [messageId]
  );
  if (!result.rows.length) {
    return null;
  }
  return result.rows[0];
};

const doesMessageBelongToUser = async (messageId, userId) => {
  const result = await pool.query(
    `SELECT EXISTS(
    SELECT *
    FROM messages
    WHERE messages.id = $1 AND user_id = $2
  )`,
    [messageId, userId]
  );
  const messageBelongsToUser = result.rows[0].exists;
  console.log('>>>> booléen ?', result.rows[0].exists);
  return messageBelongsToUser;
};

const deleteChannels = async channelId => {
  await pool.query(`DELETE FROM channel WHERE id = $1`, [channelId]);
};

const deleteMessage = async id => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};

module.exports = {
  getChannels,
  getMessages,
  createChannel,
  createMessage,
  deleteChannels,
  createUser,
  getVerifiedUserId,
  createSession,
  getUserFromSessionId,
  getMessage,
  deleteMessage,
  doesMessageBelongToUser,
};
