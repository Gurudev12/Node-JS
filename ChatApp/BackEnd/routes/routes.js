/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : routes.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 6-9-2019
 * 
 **************************************************************************/
const express=require('express')
const router=express.Router()
const tokenVerify=require('../middleware/tokengenerator')

const crtl=require('../controller/controller')

router.post('/Registration',crtl.registrationController)

router.post('/Login',crtl.loginController)

router.post('/ForgotPassword',crtl.forgotPasswordController)

router.post('/ResetPassword',tokenVerify.verifyToken,crtl.resetPassword)

module.exports=router












