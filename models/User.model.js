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
    basicCourse:{
        type: Boolean,
        default: false
    },
    plusCourse:{
        type: Boolean,
        default: false
    },
    proCourse:{
        type:Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('User', userSchema);