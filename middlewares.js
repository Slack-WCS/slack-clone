/* eslint-disable no-console */
const dataAccess = require('./data-access');

const setUser = async (req, res, next) => {
  const { sessionId } = req.cookies;
  try {
    const user = await dataAccess.getUserFromSessionId(sessionId);
    // ici on ajoute 'manuellement' le user au req
    req.user = user;
  } catch (error) {
    if (error.message === 'User is not authenticated.') {
      req.user = null;
    } else {
      console.error(error);
    }
  }
  next();
};

const allowAccessIfUserAsPermission = async (req, res, next) => {
  const channelId = parseInt(req.params.channelId, 10); // 10 pour préciser que c'est un nombre normal, pas binaire.
  const { id: userId } = req.user;
  const shouldGetMessages = await dataAccess.doesUserHavePermissionToChannel(
    channelId,
    userId
  );

  if (!shouldGetMessages) {
    return res.sendStatus(403);
  }
  return next();
};

module.exports = { setUser, allowAccessIfUserAsPermission };
