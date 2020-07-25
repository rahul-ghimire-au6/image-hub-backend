const express=require('express')
const router=express.Router()
const image_controller = require('../controller/image_controller')
const upload = require('../helper/multer_setting')
const authentication = require('../middlewares/authentication')
const authentication159 = require('../middlewares/authentication159')


router.get('/get_image_public',image_controller.get.get_image_public)
router.get('/get_image_private',authentication,image_controller.get.get_image_private)

router.post('/upload',authentication,upload.single('image'),image_controller.post.upload_image)
router.post('/upload/:token',authentication159,upload.single('image'),image_controller.post.upload_image)

module.exports = router
