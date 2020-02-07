/* eslint-disable radix */
const dataAccess = require('./data-access');

// GET
const getChannels = async (req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const getMessages = async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const page = parseInt(req.query.page);
  const offset = (page - 1) * 10;

  const messagesWithCount = await dataAccess.getMessages(channelId, offset);
  if (page * 10 >= messagesWithCount.totalCount) {
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
const createChannel = (req, res) => {
  const { nameChannels } = req.body;
  dataAccess.createChannel(nameChannels);
  return res.send('channel posté');
};

const createMessage = async (req, res) => {
  const { contentMessage, channelId } = req.body;
  const { user } = req;

  await dataAccess.createMessage(channelId, contentMessage, user.id);

  return res.status(201).send('Message added');
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
  res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
  return res.sendStatus(201);
};

// DELETE
const deleteChannels = (req, res) => {
  const { channelId } = req.params;
  dataAccess.deleteChannels(channelId);
  // eslint-disable-next-line no-unused-expressions
  err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la suppression des users');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  };
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
};
