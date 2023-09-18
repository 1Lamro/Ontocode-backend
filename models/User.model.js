const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },

    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },

    progress: {
        type: Number,
        default: 0,
        max: 100
    },

})

module.exports = mongoose.model('User', userSchema);