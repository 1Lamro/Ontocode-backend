const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title: String,
    text: String,
    materials: {
        url: [{
            ref: String
        }],
        video: [{
            vid: String
        }],
        task: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Task'
        }
    },
    img: String
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course