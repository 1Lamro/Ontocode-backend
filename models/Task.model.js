const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: String,
    question: String,
    solution: String
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task