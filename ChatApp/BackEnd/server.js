const express = require('express')
//validator require for validation purpose.
var validator = require('express-validator');
var mongoose=require('mongoose')
var bodyparser=require('body-parser')
let routes=require('../BackEnd/routes/routes')

var cors= require('cors')
// Configuring the database
const dbConfig = require('../BackEnd/config/database');

//use express method and assign to variable app.
const app = express()
 
//port no
const port=3000;
app.use(cors())
app.use(bodyparser.json())
app.use(validator())

app.use('/ChatApp',routes)


//these method getting something and display
app.get('/ChatApp', function (req, res) {
    res.send('Hello World')
  })



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
app.listen(port,()=>{
    console.log("Server started at port:"+port)
})
