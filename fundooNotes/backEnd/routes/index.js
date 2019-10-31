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
const ctrl = require("../controller/user");

const labelCtrl = require("../controller/label");
const noteCtrl = require("../controller/note");
const authentication = require("../utility/authentication");
const router = express.Router();
const multer = require("../service/multer");

router.post("/registration", ctrl.registration);  
router.post("/verifyRegistration", authentication.registrationTokenVerify, ctrl.verify);
router.post("/login", ctrl.login); 
router.post("/forgotPassword", ctrl.forgotPassword);   ///forgot-password
router.post("/resetPassword", authentication.resetTokenVerify, ctrl.reset);   

router.post("/uploadImage",authentication.tokenVerify, multer.single("file"), ctrl.uploadImage);

//Label
router.post("/createLabel",authentication.tokenVerify,labelCtrl.create); 
router.post("/updateLabel", authentication.tokenVerify, labelCtrl.update);  
router.post("/deleteLabel", authentication.tokenVerify, labelCtrl.delete);  
router.get("/getAllLabel", authentication.tokenVerify, labelCtrl.read);   

//Notes
router.post("/createNote", authentication.tokenVerify, noteCtrl.create); 
router.post("/updateNote", authentication.tokenVerify, noteCtrl.update);
router.post("/deleteNote", authentication.tokenVerify, noteCtrl.delete); 
router.get("/getAllNote", authentication.tokenVerify, noteCtrl.read);  //above all done,bellow remaining
router.post("/addLabel", authentication.tokenVerify, noteCtrl.add);  
router.post("/deleteLabelFromNote", authentication.tokenVerify, noteCtrl.deleteLabel);
router.post("/searchNote", authentication.tokenVerify, noteCtrl.search);

module.exports = router;