/*************************************************************************
 * @Execution        : 1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : It contain all API routes
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

const labelCtrl=require('../controller/labelController')
const noteCtrl=require('../controller/noteController')
const utility=require('../utility/utility')
const router=express.Router()
const multer=require("../service/multer")

router.post('/registration',ctrl.registrationController)

router.post('/verifyRegistration',utility.verifyToken,ctrl.registrationVerifyController)

router.post('/login',ctrl.loginController)

router.post('/forgotPassword',ctrl.forgotController)

router.post('/resetPassword',utility.verifyToken,ctrl.newResetPassword)

router.post('/uploadImage',utility.verifyToken,multer.single('file'),ctrl.uploadImageController)

//Label
// router.post('/createLabel',utility.verifyToken,labelCtrl.createLabelController)
router.post('/createLabel',utility.verifyTokenWithRedis,labelCtrl.createLabelController)

//router.post('/updateLabel',utility.verifyToken,labelCtrl.updateLabelController)
router.post('/updateLabel',utility.verifyTokenWithRedis,labelCtrl.updateLabelController)

//router.post('/deleteLabel',utility.verifyToken,labelCtrl.deleteLabelController)
router.post('/deleteLabel',utility.verifyTokenWithRedis,labelCtrl.deleteLabelController)

// router.get('/getAllLabel',utility.verifyToken,labelCtrl.getAllLabelController)
router.get('/getAllLabel',utility.verifyTokenWithRedis,labelCtrl.getAllLabelController)

//Notes
// router.post('/createNote',utility.verifyToken,noteCtrl.createNoteController)
router.post('/createNote',utility.verifyTokenWithRedis,noteCtrl.createNoteController)


//router.post('/updateNote',utility.verifyToken,noteCtrl.updateNoteController)
router.post('/updateNote',utility.verifyTokenWithRedis,noteCtrl.updateNoteController)


//router.post('/deleteNote',utility.verifyToken,noteCtrl.deleteNoteController)
router.post('/deleteNote',utility.verifyTokenWithRedis,noteCtrl.deleteNoteController)

//router.get('/getAllNote',utility.verifyToken,noteCtrl.getAllNoteController)
router.get('/getAllNote',utility.verifyTokenWithRedis,noteCtrl.getAllNoteController)

//new operation using redis

router.post('/resetPass',utility.verifyTokenWithRedis,ctrl.newResetPassword)



module.exports=router;