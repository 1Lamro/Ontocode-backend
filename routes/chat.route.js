const express = require('express');
const { chatController } = require('../controllers/chat.controllers');
const router = express.Router();



router.get('/chat/:chatId', chatController.getChat);
router.post('/', chatController.createChat);
router.post('/message/:chatId', chatController.sendMessage);

module.exports = router; 