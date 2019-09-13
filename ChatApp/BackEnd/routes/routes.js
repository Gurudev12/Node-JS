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
const chatCtrl=require('../controller/chatcontroller')

router.post('/Registration',ctrl.registrationController)

router.post('/Login',ctrl.loginController)

router.post('/ForgotPassword',ctrl.forgotPasswordController)

router.post('/ResetPassword',tokenVerify.verifyToken,ctrl.resetPassword)

/****************newchanges********************************************/ 
/*getting data back from databce*/

router.get('/userData',ctrl.userDataController)


//storing chat detail in db
router.post('/chatAppDetail',chatCtrl.chatAppDetailController)

//get back message chat detail from db
router.get('/messageChatAppData',chatCtrl.getChatAppDataController)



module.exports=router





