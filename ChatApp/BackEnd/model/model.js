
/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : Model contains the schema for database as mongodb is without
 *                    schema and the data received from the service is put in the 
 *                    schema and that schema variable's model is saved in the 
 *                    MONGO DATABASE .
 * 
 * @file            : model.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 5-09-2019
 * 
 **************************************************************************/
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const nodemail=require('../middleware/sendMail')
const tokenGenerator=require('../middleware/tokengenerator')


let RegisterSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    },
    {
    timestamps: true
    });
    
//creating function to encrypt password
 function passwordEncrypt(password)
{
    let saltRounds=10
    let salt=bcrypt.genSaltSync(saltRounds)
    let encrptedPass=bcrypt.hashSync(password,salt)
    return encrptedPass
}
//creating collection(registrationDetail)
let model= mongoose.model('registrationDetail',RegisterSchema);

exports.registrationModel=(userDetail,callback)=>{

    model.find({'email':userDetail.email},model.email,(err,data)=>{
   
        if(err)
        {
           console.log("Error occured while registration")
        }
        else if(data.length>0)
        {
            console.log("Already exist")
           return callback("Sorry..Already register")
        }
        //if registration is not done before then register to database
        else{
            let newUser=new model({
            firstname:userDetail.firstname,
            lastname:userDetail.lastname,
            email:userDetail.email,
            password:passwordEncrypt(userDetail.password),
            })
            
            //register new entry
            newUser.save((err,data)=>{
            if(err)
            {  
                callback(err)
            }
            else
            {
            console.log("Register Sucessfully")
            callback(null,data)
            }
        })
    }
})
}
/*login model***************************************************/

exports.loginModel=(loginDetail,callback)=>{
    console.log("model login")

    model.find({'email':loginDetail.email},(err,data)=>{ //data contain hole user information
        console.log(data)
        if(err) {
            console.log("error generated while login")
        } 
        else if(data.length>0)
        {
            for(let i=0;i<data.length;i++){
            bcrypt.compare(loginDetail.password,data[0].password,(err,res)=>{ //res contain true or false
                if(err)
                {
                    console.log(err)
                }
                else if(res===true)
                {
                   callback("password matches")
                }
                else if(res===false)
                {
                callback("password not matched")

                }
            })
            }
        } 
        else{
            callback("email not matched")
        }
      })
}


/*************************************************************** */

exports.forgotPasswordModel=(forgotPasswordEmail,callback)=>{

    model.find({'email':forgotPasswordEmail},(err,data)=>{
        if(err){
            callback(err)
        }
        //email find in the database
        else if(data.length>0){ 
            console.log("Your email is matched")

                //taking email and send it to createNewToken()
                let payload = {
                    '_id': data[0]._id
                }
        
            //create new token
         let newToken=tokenGenerator.createNewToken(payload)
         console.log(newToken)
            //after generating token send it to perticular email-id
            nodemail.sendMail(forgotPasswordEmail,newToken,(err,rsp)=>{
                if(err)
                {
                    callback(err)
                }
                else
                {
                    callback(rsp)
                }
            })
        }
        else{
            callback("Sorry..these email is invalid")
        }
    })
    
}
/*Reset password****************************************************************** */
exports.resetPasswordModel=(id,newPassword,callback)=> 
{
 
    let hashedPassword=passwordEncrypt(newPassword)


            model.findOneAndUpdate({ '_id': id }, { $set: { 'password':hashedPassword} }, (err, data) => {
            
                if (err) {
                    console.log("update document error");
                    return callback(err + " update document error")
                } else {
                    if (data) {
                        console.log("update document success");
                        return callback(null, data)
                    } else {
                        console.log("user credential not found");
                        return callback("user credential not found")
                    }
                }
            })
}














