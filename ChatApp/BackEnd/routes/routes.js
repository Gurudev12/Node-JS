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

const ctrl=require('../controller/controller')

router.post('/Registration',ctrl.registrationController)

router.post('/Login',ctrl.loginController)

router.post('/ForgotPassword',ctrl.forgotPasswordController)

router.post('/ResetPassword',tokenVerify.verifyToken,ctrl.resetPassword)

/****************newchanges********************************************/ 
router.get('/userData',ctrl.userDataController)

router.post('/chatAppDetail',ctrl.chatAppDetailController)



module.exports=router





