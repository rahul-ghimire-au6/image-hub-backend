const express=require('express')
const router=express.Router()
const user_controller = require('../controller/user_controller')

router.post('/signup',user_controller.post.signup)
router.post('/login',user_controller.post.login)
router.post('/logout/:token',user_controller.post.logout)

module.exports = router
