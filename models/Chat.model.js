const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // Участники чата

    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }, // Отправитель сообщения

            text: String, // Текст сообщения

            timestamp: {
                type: Date,
                default: Date.now
            } // Временная метка сообщения
        }
    ]
});

module.exports = mongoose.model('Chat', chatSchema);
