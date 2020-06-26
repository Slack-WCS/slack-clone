const router = require('express').Router({ mergeParams: true });
const controllers = require('../controllers');
const { allowAccessIfUserAsPermission } = require('../middlewares');

// Middlewares
router.use(allowAccessIfUserAsPermission);

// routes
router.get('/messages', controllers.getMessages);
router.post('/messages', controllers.createMessage);
router.get('/users', controllers.getUsersFromChannel);
router.delete('/', controllers.deleteChannels);

module.exports = router;
