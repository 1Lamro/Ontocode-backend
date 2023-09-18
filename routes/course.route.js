const { Router } = require('express')
const { courseController} = require('../controllers/course.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.post('/news', courseController.postCourse)
router.delete('/news/:id', courseController.deleteCourseId)
router.patch('/news/:id', courseController.patchCourseId)
router.get('/news/:id', courseController.getCourseId)
router.get('/news', courseController.getCourse)

module.exports = router 