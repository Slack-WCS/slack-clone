const router = require('express').Router();
const controllers = require('../controllers');
const routerIdentifiedChannel = require('./channels.channelId');

// Messages & Channels

router.get('/channels', controllers.getChannels);

router.get('/whoami', controllers.getCurrentUser);

// router POST
// Authentification
router.post('/users', controllers.createUser);

router.post('/sessions', controllers.createSession);

// Channels & messages

router.post('/channels', controllers.createChannel);

// router DELETE

router.delete('/messages/:id', controllers.deleteMessage);

// router identified channel

router.use('/channels/:channelId', routerIdentifiedChannel);

// Route tests

// router.get('/channels/:channelId/messages', (req, res) => {
//   res.json({
//     messages: [
//       {
//         id: '1234',
//         content: 'Hello',
//       },
//       {
//         id: '5678',
//         content: 'Bonjour',
//       },
//       {
//         id: '1290',
//         content: 'Ciao',
//       },
//       {
//         id: '9835',
//         content: 'Holà',
//       },
//     ],
//   });
// });

// router.get('/channels', (req, res) => {
//   res.json({
//     channels: [
//       {
//         id: 'abc',
//         name: 'general',
//       },
//       {
//         id: 'def',
//         name: 'random',
//       },
//     ],
//   });
// });

module.exports = router;
