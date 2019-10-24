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
const express = require("express");
const ctrl = require("../controller/userController");

const labelCtrl = require("../controller/labelController");
const noteCtrl = require("../controller/noteController");
const utility = require("../utility/utility");
const router = express.Router();
const multer = require("../service/multerService");

router.post("/registration", ctrl.registrationController);  
router.post("/verifyRegistration", utility.registrationTokenVerify, ctrl.registrationVerifyController);
router.post("/login", ctrl.loginController); 

router.post("/forgotPassword", ctrl.forgotController);   
router.post("/resetPassword", utility.resetTokenVerify, ctrl.newResetPassword);   

router.post("/uploadImage",utility.tokenVerify, multer.single("file"), ctrl.uploadImageController);

//Label
router.post("/createLabel",utility.tokenVerify,labelCtrl.createLabelController); 
router.post("/updateLabel", utility.tokenVerify, labelCtrl.updateLabelController);  
router.post("/deleteLabel", utility.tokenVerify, labelCtrl.deleteLabelController);  
router.get("/getAllLabel", utility.tokenVerify, labelCtrl.getAllLabelController);   

//Notes
router.post("/createNote", utility.tokenVerify, noteCtrl.createNoteController); 
router.post("/updateNote", utility.tokenVerify, noteCtrl.updateNoteController);
router.post("/deleteNote", utility.tokenVerify, noteCtrl.deleteNoteController); 
router.get("/getAllNote", utility.tokenVerify, noteCtrl.getAllNoteController);  
router.post("/addLabel", utility.tokenVerify, noteCtrl.addLabelToNoteController);  
router.post("/deleteLabelFromNote", utility.tokenVerify, noteCtrl.deleteLabelFromNoteController);
router.post("/searchNote", utility.tokenVerify, noteCtrl.searchNoteController);

module.exports = router;