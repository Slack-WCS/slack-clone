const router = require('express').Router();
const controllers = require('./controllers');

router.get('/channels/:channelId/messages', controllers.getMessages);
// router.get('/channels/:channelId/messages', (req, res) => {
//   console.log(req.params.channelId);
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

router.get('/channels', controllers.getChannels);
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

router.post('/channels', controllers.postChannels);

module.exports = router;
