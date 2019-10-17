/*************************************************************************
 * @Execution        : 1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : server.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
const express = require("express");
const validator = require("express-validator");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("../backEnd/config/config");
const routes = require("./routes/userRoutes")
require("dotenv").config();

const app = express();
const PORT = config.PORT;

app.use(bodyParser.json());
app.use(validator());
app.use("/", routes);
const multer = require("multer");
const redis = require("redis");
const client = redis.createClient();
const logger = require('./config/log')
const mongooseObject = require("./service/mongooseService")
var schedule = require('node-schedule');
const ctrl=require("../backEnd/controller/noteController")

mongooseObject.mongooseService()

app.listen(PORT, () => {
    logger.info("Server started at port:", PORT);
});

//Redis connectivity
client.on("connect", (err, data) => {
    if (err) {
        logger.error(err);
    } else {
        logger.info("redis connected successfully");
    }
});
 


//  let j=schedule.scheduleJob('* * * * * *', function(){
//    //here we are assuming that perticular user login with its userId.because we want to fetch notes based on userId
//   let date=new Date();
//   logger.info("========>"+date)
//    let userId="5d97427de380595ced58580c"
//     ctrl.reminderController(userId)
//     .then(reminderData=>{
//       console.log("REMINDER DATA",reminderData);
      
//     })
//     .catch(err=>{
//       console.log("ERRRR",err);
      
//     })
//     console.log('The answer to life, the universe, and everything!');
//   });

module.exports = app;
