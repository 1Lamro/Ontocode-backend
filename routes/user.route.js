const {Router} = require('express')
const {userController} = require('../controllers/user.controllers');
const { registerValidation, loginValidator } = require('../models/middlewares/Validator');
const { check } = require('express-validator');
const { checkAuth } = require('../models/middlewares/auth.middleware');
const multer = require('multer')
const fileMiddleware = require("../models/middlewares/file.middleware")
const router = Router();
const upload = multer()

router.post('/registration', registerValidation,  userController.registration);
router.post('/login', loginValidator, userController.login);
// router.post('/avatar', checkAuth, userController.uploadAvatar)
router.get('/profile/:id', userController.getUserProfile);
router.delete('/profile/:id', checkAuth, userController.deleteUser)
// router.put('/profile/avatar', userController.updateAvatar);
router.patch("/addimage", checkAuth, fileMiddleware.single("img"), userController.addImage); // добавление фото
router.get("/allimages", checkAuth, userController.findImages); // вывод фото
router.patch("/editimage", upload.single("img"), checkAuth, userController.editImage); // изменение авы

module.exports = router;