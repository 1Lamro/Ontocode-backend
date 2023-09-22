const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    messages: [
        {
            sender: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User"
            },
            text: String,
            timestamp: {
                type: Date,
                default: Date.now
            } // Временная метка сообщения
        }
    ],
    

});

module.exports = mongoose.model('Chat', chatSchema);
