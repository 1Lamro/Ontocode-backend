const {Router} = require('express')
const {userController} = require('../controllers/user.controllers');
const { registerValidation, loginValidator } = require('../models/middlewares/Validator');
const router = Router();

router.post('/registration', registerValidation,  userController.registration);
router.post('/login', loginValidator, userController.login);
router.get('/profile', userController.getUserProfile);
router.put('/profile/avatar', userController.updateAvatar);

module.exports = router;