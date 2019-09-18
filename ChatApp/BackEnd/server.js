/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : server.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 6-9-2019
 * 
 **************************************************************************/
const express = require('express')
//validator require for validation purpose.
var validator = require('express-validator');
var mongoose=require('mongoose')
var bodyparser=require('body-parser')
let routes=require('./routes/userRoutes')

var cors= require('cors')
// Configuring the database
const dbConfig = require('../BackEnd/config/database');

//use express method and assign to variable app.
const app = express()
 
//port no
// const port=3000;
require('dotenv').config()
let PORT=process.env.PORT
console.log(PORT)

/*socket part********************************** */
const socketIo=require('socket.io')
const chatController=require('./controller/chatController')
/**************************************** */

app.use(cors())
app.use(express.static("../FrontEnd"));

app.use(bodyparser.json())
app.use(validator())

app.use('/',routes)

  
//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//it show  that msg that server is started
const server=app.listen(PORT,()=>{                    
    console.log("Server started at port:"+PORT)
})

//Bind the socket.IO with the http server
const io=socketIo(server);

io.on('connection',(socket)=>{
    console.log("Socket connected");


    socket.on('messageContainer',(message)=>{
        
        chatController.chatAppDetailController(message,(err,messageData)=>{
            if(err)
            {
                console.log("error====>",err)
            }
            else{
                console.log("Message data comming from client side====>",messageData)
                io.emit("message",messageData);
            }
        })
    })
})

