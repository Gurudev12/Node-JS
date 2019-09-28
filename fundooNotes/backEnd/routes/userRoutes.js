/*************************************************************************
 * Execution        : 
 * 
 * Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : userRoutes.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
const express=require('express');
const ctrl=require('../controller/userController')
const utility=require('../utility/utility')
const router=express.Router()

router.post('/registration',ctrl.registrationController)

router.post('/login',ctrl.loginController)

router.post('/forgotPassword',ctrl.forgotController)

router.post('/resetPassword',utility.verifyToken,ctrl.resetPassword)

router.post('/verifyRegistration',utility.verifyToken,ctrl.registrationVerifyController)

module.exports=router;