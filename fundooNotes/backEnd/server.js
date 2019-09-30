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

const express=require('express');
const validator=require('express-validator');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const routes=require('../backEnd/routes/userRoutes');

require('dotenv').config()

const app=express();
const port=4000;
app.use(bodyParser.json())
app.use(validator());
app.use('/',routes)


// mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true})
mongoose.connect('mongodb://localhost:27017/fundooNotes',{useNewUrlParser:true})
.then(()=>{
    console.log("successfully connected to database");
})
.catch(err=>{
    console.log("could not connected to the database",err);
    process.exit();
});
const PORT=4000;
// app.listen(process.env.PORT,()=>{
//     console.log("Server started at port:",process.env.PORT);
// })
app.listen(PORT,()=>{
    console.log("Server started at port:",PORT);
})
module.exports=app;

