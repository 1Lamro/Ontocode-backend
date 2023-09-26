const { Router } = require('express')
const imageController = require('../controllers/image.controller')
const imageMiddleware = require('../models/middlewares/image.middleware')
const router = Router()

router.post('/images/img', imageMiddleware.single('image'), imageController.uploadImg)

module.exports = router