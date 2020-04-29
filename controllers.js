/* eslint-disable radix */
const dataAccess = require('./data-access');
const services = require('./services');
const { EVENTS, eventEmitter } = require('./events');

// GET
const getChannels = async (req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const MESSAGES_PAGE_SIZE = 10;

const getMessages = async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const page = parseInt(req.query.page);
  const offset = (page - 1) * MESSAGES_PAGE_SIZE;

  const messagesWithCount = await dataAccess.getMessages(channelId, offset);
  if (page * MESSAGES_PAGE_SIZE >= messagesWithCount.totalCount) {
    messagesWithCount.nextPage = null;
  } else {
    messagesWithCount.nextPage = page + 1;
  }
  return res.status(200).json(messagesWithCount);
};

const getCurrentUser = (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).send(user);
  }
  return res.sendStatus(401);
};

// POST
const createChannel = async (req, res) => {
  const { nameChannels } = req.body;
  await dataAccess.createChannel(nameChannels);
  return res.send('channel posté');
};

const createMessage = async (req, res) => {
  const { contentMessage, channelId } = req.body;
  const { user } = req;
  const extraInfo = JSON.stringify(
    await services.getExtraInfoFromMessage(contentMessage)
  );
  const { id } = await dataAccess.createMessage(
    channelId,
    contentMessage,
    user.id,
    extraInfo
  );
  const result = await dataAccess.getMessage(id);

  eventEmitter.emit(EVENTS.MESSAGE_CREATED, result);
  return res.status(201).send(result);
};

const getCleanPassword = password => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};

const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const password = getCleanPassword(req.body.password);
    await dataAccess.createUser(username, password);
  } catch (error) {
    if (error.isUnknown) {
      return res.sendStatus(500);
    }
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const createSession = async (req, res) => {
  const { username, password } = req.body;
  const userId = await dataAccess.getVerifiedUserId(username, password);
  const sessionId = await dataAccess.createSession(userId);
  res.cookie('sessionId', sessionId, {
    maxAge: 999900000,
    httpOnly: true,
    sameSite: true,
  });
  return res.sendStatus(201);
};

// DELETE
const deleteChannels = async (req, res) => {
  const { channelId } = req.params;
  await dataAccess.deleteChannels(channelId);
  // Si tout s'est bien passé, on envoie un statut "ok".
  res.sendStatus(200);
};

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const doesMessageExist = !!(await dataAccess.getMessage(messageId));
  if (!doesMessageExist) {
    return res.sendStatus(404);
  }
  const { id: userId } = req.user;
  const shouldDelete = await dataAccess.doesMessageBelongToUser(
    messageId,
    userId
  );
  if (!shouldDelete) {
    return res.sendStatus(403);
  }
  await dataAccess.deleteMessage(messageId);
  return res.sendStatus(200);
};

module.exports = {
  getChannels,
  getMessages,
  createChannel,
  createMessage,
  deleteChannels,
  createUser,
  createSession,
  getCurrentUser,
  deleteMessage,
};
