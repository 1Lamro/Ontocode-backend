const { Router } = require('express')
const { taskController} = require('../controllers/task.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.post('/news', taskController.postTask)
router.delete('/news/:id', taskController.deleteTaskId)
router.patch('/news/:id', taskController.patchTaskId)
router.get('/news/:id', taskController.getTaskId)
router.get('/news', taskController.getTask)

module.exports = router 