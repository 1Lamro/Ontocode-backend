const {Router} = require('express')
const {userController} = require('../controllers/user.controllers');
const { registerValidation, loginValidator } = require('../models/middlewares/Validator');
const { check } = require('express-validator');
const { checkAuth } = require('../models/middlewares/auth.middleware');
const router = Router();
const imgMiddleware = require('../models/middlewares/image.middleware')

router.post('/registration', registerValidation,  userController.registration);
router.post('/login', loginValidator, userController.login);
router.get('/profile/:id', userController.getUserProfile);
router.delete('/profile/:id', checkAuth, userController.deleteUser)
router.post('/login', loginValidator,  userController.login);
router.get('/profile/:id', userController.getUserProfile);
router.get('/users', userController.getAllUsers);
router.patch('/course/:userId', userController.updateCourse)
router.post('/image', imgMiddleware.single('avatar'), userController.addImage)
router.get('/antar', userController.getUS)
router.patch('/patch/:id', userController.patchUser)

module.exports = router;