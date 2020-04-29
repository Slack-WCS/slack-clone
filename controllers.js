const dataAccess = require('./data-access');

// GET
const getChannels = async (_req, res) => {
  const channels = await dataAccess.getChannels();
  return res.status(200).json({ channels });
};

const getMessages = async (req, res) => {
  const channelId = parseInt(req.params.channelId);

  const messages = await dataAccess.getMessages(channelId);
  return res.status(200).json({ messages });
};
// POST
const postChannels = (req, res) => {
  const nameChannels = req.body.nameChannels;
  dataAccess.postChannels(nameChannels);
  return res.send('channel posté');
};

const postMessages = (req, res) => {
  const contentMessages = req.body.contentMessages;
  const channelId = req.params.channelId;
  dataAccess.postMessages(channelId, contentMessages);
  return res.send('message posté');
};
// DELETE
const deleteChannels = (req, res) => {
  const channelId = req.params.channelId;
  dataAccess.deleteChannels(channelId),
    err => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
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
  postChannels,
  postMessages,
  deleteChannels,
};
