const Task = require("../models/Task.model");
module.exports.taskController = {
  postTask: async (req, res) => {
    const { title, question, solution } = req.body
    try {
        const data = await Task.create({ title, question, solution});
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
   
  },
  deleteTaskId: async (req, res) => {
    try {
       const data = await Task.findByIdAndRemove(req.params.id)
        res.json("Таска удалена")
    } catch (error) {
        res.json(error.message)
    }
   
  },
  patchTaskId: async (req, res) => {
    try {
        const data = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json("Таска обновлена");
    } catch (error) {
        res.json(error.message)
    }

  },
  getTaskId: async (req, res) => {
    try {
        const data = await Task.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }

  },
  getTask: async (req, res) => {
    try {
        const data = await Task.find({})
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
  },
}