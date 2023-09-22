const Chat = require('../models/Chat.model')

module.exports.chatController = {

    getChat: async (req, res) => {
        try {
          const chat = req.params.chatId;
          console.log(chat);
            const chats = await Chat.findById(chat)
            res.json(chats)
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' });
        }
    },

    createChat: async (req, res) => {
      const {text, sender} = req.body
        try {
            const chat = await Chat.create({messages: {text, sender, timestamp}});
            await chat.save();
            res.status(201).json({ message: 'Чат успешно создан' });
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' });
        }
    },

    sendMessage: async (req, res) => {
        const { sender, text } = req.body;
        try {
          const chatId = req.params.chatId;
          const chat = await Chat.findById(chatId);
      
          if (!chat) {
            return res.status(404).json({ message: 'Чат не найден' });
          }
      
          chat.messages.push({ sender, text });
          await chat.save();
      
          res.json({ message: 'Сообщение успешно отправлено' });
        } catch (error) {
          res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' });
        }
      },

}