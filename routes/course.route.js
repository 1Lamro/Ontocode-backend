const { Router } = require('express')
const { courseController} = require('../controllers/course.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.post('/course', courseController.postCourse)
router.delete('/course/:id', courseController.deleteCourseId)
router.patch('/course/:id', courseController.patchCourseId)
router.get('/course/:id', courseController.getCourseId)
router.get('/course', courseController.getCourse)

module.exports = router 