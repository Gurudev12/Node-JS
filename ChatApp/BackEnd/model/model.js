
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
 * @since           : 6-9-2019
 * 
 ******************************************************************************/
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
           return callback(null,"Sorry..Already register")
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
            newUser.save((err,res)=>{
            if(err)
            {  
                callback(err)
            }
            else
            {
                console.log("REGISTRATION SUCCESFULL !!! ...  ");
                
            callback(null,"Registration successfully")
            }
            
        })
    }
})
}
/*login model***************************************************/

exports.loginModel=(loginDetail,callback)=>{
   

    model.find({'email':loginDetail.email},(err,data)=>{ //data contain whole user information
    
        console.log(data)
        if(err) {
            console.log("error generated while login")
        } 
        else if(data.length>0)
        {
            payload={
                'id':data[0]._id
            }
            bcrypt.compare(loginDetail.password,data[0].password,(err,res)=>{ //res contain true or false
                if(err)
                {
                    console.log(err)
                }
                else if(res===true)
                {
                    let newToken=tokenGenerator.createNewToken(payload)

                    loginResponse={
                       'success':true,
                       'message':"Successful login",
                       'data':{
                           email:data[0].email,
                           userId:data[0]._id,
                           name:data[0].firstname,
                           token:newToken
                                }
                          }

                   callback(null,loginResponse)
                }
                else if(res===false)
                {
                callback(null,"login failed")

                }

            })
            
        } 
        else{
            callback(null,"email not matched")
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
            nodemail.sendMail(forgotPasswordEmail,newToken,(err,res)=>{
                if(err)
                {
                    callback(err)
                }
                else if(res==true)
                {
                    callback(null,"mail send sucessfully")
                }
                else if(res===false)
                {
                    callback(null,"Mail not send")
                }
            })
        }
        else{
            callback(null,"email is invalid")
        }
    })
    
}
/*Reset password****************************************************************** */
exports.resetPasswordModel=(resetData,callback)=> 
{
 
    let hashedPassword=passwordEncrypt(resetData.password)
    console.log("Model"+hashedPassword)


    model.findOneAndUpdate({ '_id': resetData.id},{ $set: { 'password':hashedPassword} }, (err, data) => {

            if (err) {
                    return callback(err)
            }
            else if(data){
                console.log("model dtaa"+data)
                return callback(null,data)
            } 
            else{
                return callback(null,"user credential not matched")
                }
                    
                
            })
        }
/********************************newchanges***************************************** */
exports.userDataModel=(callback)=>{

    model.find({},['_id','firstname'],(err,userData)=>{ //it will only return id,firstname from array of user data
      
    if(err)
    {
        return callback(err)
    }
    else if(userData.length>0)
    {
        return callback(null,userData)
    }
    else
    {
        return callback(null,"data is not present")
    }
      })  
    };










