const express=require('express')
const router=express.Router()

const crtl=require('../controller/controller')

router.post('/Registration',crtl.registrationController)

router.post('/Login',crtl.loginController)

router.post('/ForgotPassword',crtl.forgotPasswordController)

router.get('/ChatApp')

module.exports=router