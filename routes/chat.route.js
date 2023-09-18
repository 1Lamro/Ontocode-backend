const express = require('express');
const router = express.Router();



router.get('/user/:userId', chatController.getUserChats);
router.post('/', chatController.createChat);
router.post('/:chatId/message', chatController.sendMessage);

module.exports = router;