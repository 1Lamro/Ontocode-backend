const express = require('express');
const { chatController } =require("../controllers/chat.controllers")
const router = express.Router();



router.get('/user/:userId', chatController.getUserChat);
router.post('/chat', chatController.createChat);
router.post('/:chatId/message', chatController.sendMessage);

module.exports = router;