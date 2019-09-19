
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
const tokenGenerator=require('../middleware/tokenGenerator')


let RegisterSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"first name is empty"]
    },

    lastname:{
        type:String,
        required:[true,"last name is empty"]
    },

    email:{
        type:String,
        required:[true,"email is not in format"]
    },
    password:{
        type:String,
        required:[true,"password is empty"]
    }
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

class UserModel
{
    registrationModel=(userDetail,callback)=>{
        try{
        model.find({'email':userDetail.email},model.email,(err,data)=>{
    
            if(err)
            {
               console.log(err)
            }
            else if(data.length>0)
            {
               return callback(null,false)
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
                callback(null,true)
                }
                
            })
        }
    })
        }catch(e)
        {
            console.log(e)
        }
    }
    /*login model***************************************************/
    
loginModel=(loginDetail,callback)=>{
       
        try{
        model.find({'email':loginDetail.email},(err,data)=>{ //data contain whole user information
        
            console.log(data)
            if(err) {
                console.log("error generated while login")
            } 
            else if(data.length>0)
            {
               let payload={
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
    
                       let  loginResponse={
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
        }catch(e)
        {
            console.log(e)
        }
    }
    /*************************************************************** */
    
forgotPasswordModel=(forgotPasswordEmail,callback)=>{
        
        try{
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
                nodemail.sendMail(forgotPasswordEmail,newToken,(err,res)=>{ //responce contain mail send
                    
                    if(err)
                    {
                        callback(err)
                    }
                    else 
                    {
                        callback(null,res)
                    }
                })
            }
        })
        }catch(e)
        {
            console.log(e)
        }
        
    }
    /*Reset password****************************************************************** */
resetPasswordModel=(resetData,callback)=> 
    {
        try{
     
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
     
                })
            }catch(e)
            {
                console.log(e)
            }
            }
    /********************************newchanges***************************************** */
userDataModel=(callback)=>{
    
        try{
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
        }catch(e)
        {
            console.log(e)
        }
        };
    
}

const userModelObject=new UserModel();
module.exports=userModelObject;










