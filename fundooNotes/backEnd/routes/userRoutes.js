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
const express = require('express');
const ctrl = require('../controller/userController')

const labelCtrl = require('../controller/labelController')
const noteCtrl = require('../controller/noteController')
const utility = require('../utility/utility')
const router = express.Router()
const multer = require("../service/multerService")

router.post('/registration', ctrl.registrationController)   //done
router.post('/verifyRegistration', utility.verifyToken, ctrl.registrationVerifyController)
router.post('/login', ctrl.loginController) //done
router.post('/forgotPassword', ctrl.forgotController)   //done
router.post('/resetPassword', utility.verifyToken, ctrl.newResetPassword)   //done
router.post('/uploadImage', utility.verifyToken, multer.single('file'), ctrl.uploadImageController)

//Label
router.post('/createLabel', utility.verifyTokenWithRedis, labelCtrl.createLabelController) //done
router.post('/updateLabel', utility.verifyTokenWithRedis, labelCtrl.updateLabelController)  //done
router.post('/deleteLabel', utility.verifyTokenWithRedis, labelCtrl.deleteLabelController)  //done
router.get('/getAllLabel', utility.verifyTokenWithRedis, labelCtrl.getAllLabelController)   //done

//Notes
router.post('/createNote', utility.verifyTokenWithRedis, noteCtrl.createNoteController) //done
router.post('/updateNote', utility.verifyTokenWithRedis, noteCtrl.updateNoteController)
router.post('/deleteNote', utility.verifyTokenWithRedis, noteCtrl.deleteNoteController) //done
router.get('/getAllNote', utility.verifyTokenWithRedis, noteCtrl.getAllNoteController)  //done
router.post('/addLabel', utility.verifyTokenWithRedis, noteCtrl.addLabelToNoteController)   //done
router.post('/deleteLabelFromNote', utility.verifyTokenWithRedis, noteCtrl.deleteLabelFromNoteController)//done
router.post('/searchNote', utility.verifyTokenWithRedis, noteCtrl.searchNoteController) //done



//new operation using redis
router.post('/resetPass', utility.verifyTokenWithRedis, ctrl.newResetPassword)

module.exports = router;