const Course = require("../models/Course.model");
module.exports.courseController = {
  postCourse: async (req, res) => {
    const { title, text, materials, img } = req.body
    try {
        const data = await Course.create({ title, text, materials, img});
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
   
  },
  deleteCourseId: async (req, res) => {
    try {
       const data = await Course.findByIdAndRemove(req.params.id)
        res.json("Курс удален")
    } catch (error) {
        res.json(error.message)
    }
   
  },
  patchCourseId: async (req, res) => {
    try {
        const data = await Course.findByIdAndUpdate(req.params.id, req.body)
        res.json("Курс обновлён");
    } catch (error) {
        res.json(error.message)
    }

  },
  getCourseId: async (req, res) => {
    try {
        const data = await Course.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }

  },
  getCourse: async (req, res) => {
    try {
        const data = await Course.find({})
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
  },
}