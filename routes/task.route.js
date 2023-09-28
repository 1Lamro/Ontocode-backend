const { Router } = require('express')
const { taskController} = require('../controllers/task.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.post('/tasks', taskController.postTask)
router.delete('/tasks/:id', taskController.deleteTaskId)
router.patch('/tasks/:id', taskController.patchTaskId)
router.get('/tasks/:id', taskController.getTaskId)
router.get('/tasks', taskController.getTask)

module.exports = router 