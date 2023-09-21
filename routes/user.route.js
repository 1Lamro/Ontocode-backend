const {Router} = require('express')
const {userController} = require('../controllers/user.controllers');
const { registerValidation, loginValidator } = require('../models/middlewares/Validator');
const { check } = require('express-validator');
const { checkAuth } = require('../models/middlewares/auth.middleware');
const router = Router();

router.post('/registration', registerValidation,  userController.registration);
router.post('/login', loginValidator, userController.login);
router.get('/profile', userController.getUserProfile);
router.put('/profile/avatar', userController.updateAvatar);
router.patch('/course/:userId', userController.updateCourse)

module.exports = router;