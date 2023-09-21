const Chat = require('../models/Chat.model')

module.exports.chatController = {

    getUserChat: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId);
            const chats = Chat.find({ participants: userId }).populate('participants', 'username');
            res.json(chats)
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' });
        }
    },

    createChat: async (req, res) => {
        const { participants } = req.body;

        try {
            const chat = new Chat({ participants });
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

      // getSender: async (req, res) => {
      //   try {
      //     const sender = await Chat.findById(req.params.id);
      //     res.json(sender);
      //   } catch (error) {
      //     res
      //       .status(500)
      //       .json({ message: "Что-то пошло не так. Профиль не виден. Попробуйте снова." });
      //   }
      // },

}