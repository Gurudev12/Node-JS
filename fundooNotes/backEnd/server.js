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

const routes = require("../backEnd/routes/userRoutes");
const config=require("../backEnd/config/config");
require("dotenv").config();

const app = express();
const PORT=config.PORT;

app.use(bodyParser.json());
app.use(validator());
app.use("/", routes);
const multer=require("multer");
const redis=require("redis");
const client=redis.createClient();

//mongoose connectivity
mongoose.connect(config.url,{useNewUrlParser:true})
    .then(() => {
        console.log("successfully connected to database");
    })
    .catch(err => {
        console.log("could not connected to the database", err);
    });

    app.listen(PORT,()=>{
    console.log("Server started at port:",PORT);
});
//Redis connectivity
client.on("connect",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log("redis connected successfully");
    }
});

module.exports = app;
