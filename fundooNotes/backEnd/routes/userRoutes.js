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
router.post("/verifyRegistration", utility.verifyToken, ctrl.registrationVerifyController);
router.post("/login", ctrl.loginController); 
router.post("/forgotPassword", ctrl.forgotController);   
router.post("/resetPassword", utility.verifyToken, ctrl.newResetPassword);   

router.post("/uploadImage",utility.verifyToken, multer.single("file"), ctrl.uploadImageController);

//Label
router.post("/createLabel",utility.verifyTokenWithRedis,labelCtrl.createLabelController); 
router.post("/updateLabel", utility.verifyTokenWithRedis, labelCtrl.updateLabelController);  
router.post("/deleteLabel", utility.verifyTokenWithRedis, labelCtrl.deleteLabelController);  
router.get("/getAllLabel", utility.verifyTokenWithRedis, labelCtrl.getAllLabelController);   

//Notes
router.post("/createNote", utility.verifyTokenWithRedis, noteCtrl.createNoteController); 
router.post("/updateNote", utility.verifyTokenWithRedis, noteCtrl.updateNoteController);
router.post("/deleteNote", utility.verifyTokenWithRedis, noteCtrl.deleteNoteController); 
router.get("/getAllNote", utility.verifyTokenWithRedis, noteCtrl.getAllNoteController);  
router.post("/addLabel", utility.verifyTokenWithRedis, noteCtrl.addLabelToNoteController);  
router.post("/deleteLabelFromNote", utility.verifyTokenWithRedis, noteCtrl.deleteLabelFromNoteController);
router.post("/searchNote", utility.verifyTokenWithRedis, noteCtrl.searchNoteController);

module.exports = router;