/***************************************************************************
 * @Execution        :1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : It provides services like email sending,password encrypt.
 *                                
 * 
 * @file            : userService.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemail=require('../service/sendMail')
let emailExistence=require('email-existence')
let utility=require('../utility/utility')

class UserService {



/***************************REGISTRATION SERVICE****************************************************/
/****
 * @description-This is  registration service while new registration
 ****/
    registrationService=(paramObject)=>{
        try{
            return new Promise((resolve, reject) => {

                /****
               * @description-Checking that user email is existing or not
               ****/
              emailExistence.check(paramObject.email,function(error, response){
               if(response==true){
                   /****
               * @description-Checking that user email id is allready present or not
               ****/
               userModel.findEmail(paramObject.email)
               .then((data) => {
                   if(data){
                       reject("EMAIL IS ALLREADY REGISTER")
                   }
                   else{
                       /****
                       * @description-If email is not present then create new object(registrationDetail) 
                       *              before that password should encrypt.
                       ****/
                   let registrationDetail = {
                       "firstName": paramObject.firstName,
                       "lastName": paramObject.lastName,
                       "email": paramObject.email,
                       "userType": paramObject.userType,
                       "password": utility.passwordEncrypt(paramObject.password)
                   }
   
                   /****
                   * @description-This method will send that object to userModel.
                   ****/
                userModel.createNewUser(registrationDetail)
                 
                       .then(data => {
                           let payload={
                               "_id":data._id
                           }
                           let registrationToken=utility.createNewToken(payload)
                    
                           let verifyLink='<p>this is link to REGISTRATION VERIFY</p><a href="http://localhost:4000/registrationVerify/'+registrationToken+'">Registration verify</a>'
                           nodemail.sendMail(data.email,verifyLink,(error,response)=>{
                               if(error){
                                   reject(error)
                               }else{
                                   resolve(response)
                               }
                           })
                           resolve("FEEDBACK:CHECK YOUR MAIL TO CONFIRM REGISTRATION" )
                       })
                       .catch(err => {
                           reject("ERROR OCCURED WHILE CREATING NEW USER")
                       })
                   }
               })
               .catch(err => {
                   reject("ERROR OCCURED WHILE FINDING EMIAL IN DATABASE")
               })
   
               }
               else{
                   reject("SORRY THIS EMAIL ID IS NOT EXISTED")
               }
           });
               
           })
        }catch(e){
            response.error=e;
            response.message="The server did not understand the request."
            return res.status(400).send(response)        }
    }
/***************************************************************** */
registrationVerifyService=(_id)=>{
    try{
        return new Promise((resolve,reject)=>{

            userModel.updateRegistrationDetail(_id)
            .then(data=>{
                 resolve(data)
            })
            .catch(err=>{
                console.log("SERVICE ERROTRRRR",err)
                 reject(err)
            })
         })
    }catch(e){
        console.log(e)
    }
}

/******************************LOGIN SERVICE*************************************************/
/****
 * @description-This is login service.
 ****/
    loginService=(loginDetail)=>{
        try{
            return new Promise((resolve, reject) => {
                /****
                * @description-Checking that user email id is already present or not.
                ****/
                userModel.findEmail(loginDetail.email)
                    .then(userData => {
                        if(userData[0].isVerify==true){
                        /****
                         * @description-If email is matched then compare password of login user with its actual password
                         ****/
                        bcrypt.compare(loginDetail.password,userData[0].password,(err,result)=>
                        {
                            if(result){
                                let payload={
                                    "id":userData[0].id
                                }
                                //Generate new token
                                 /****
                                * @description-creating new token while login and store it to database
                                ****/
                                let loginToken=utility.createNewToken(payload)

                                console.log("TOKEN",loginToken)

                                //after generating new token saved to database
                                    userModel.updateToken(userData[0],loginToken)   //userData send array and userData[0] send object
                                    .then(updatedData=>{
                                        resolve(updatedData)
                                    })
                                    .catch(error=>{
                                        reject("ERROR IN UPDATED DATA WITH TOKEN IN DATABASE")
                                    
                                    })  
    
                            }
                            else{
                                reject("PASSWORD NOT MATCHED")
                            }
                        })
                            
                        }else{
                            reject("REGISTRATION VERIFICATION NOT DONE")
                            
                        }
                        
                      
                        
                    })
                    .catch(err => {
                     reject("WRONG EMAIL ID")
                    })
            })
        }catch(e){
            console.log(e)
        }
        
    }
/********************FORGOTPASSWORD SERVICE***********************************************************/
/****
* @description-This is forgotPassword service
****/
forgotPasswordService=(email)=>{
    try{
        return new Promise((resolve,reject)=>{
    
            /****
            * @description-Checking that user email id is  present or not
            ****/
            userModel.findEmail(email)
            .then(foundData=>{
                    let payload={
                        "_id":foundData[0]._id
                    }
    
                    /****
                    * @description-After finding email create new token and send it to perticular emailId
                    ****/
                    let forgotToken=utility.createNewToken(payload)
             
                    let forgotLink='<p>this is link to RESET PASSWORD</p><a href="http://localhost:4000/resetPassword'+forgotToken+'">Reset PassWord</a>'
                    nodemail.sendMail(foundData[0].email,forgotLink,(err,data)=>{
                        if(err)
                        {
                            reject("ERROR WHILE SENDING MAIL")
                        }
                        else
                        {
                            
                            resolve("SEND EMAIL SUCCESSFULLY")
                        }
    
                    })
            })
            .catch(err=>{
                reject("EMAL NOT FOUND IN DATABASE")
            })
        })
    }catch(e){
        console.log(e)
    }
}
/********************RESET SERVICE**************************************************************/
/****
* @description-This is resetPassword service
****/
// resetService=(resetData)=>{
//   try{
//     return new Promise((resolve,reject)=>{

//         let encrptedPassword=utility.passwordEncrypt(resetData.password)
//         /****
//         * @description-This method will pass the perticular user id and encrypted password to userModel 
//         *              for update password .
//         ****/
//         userModel.updatePassword(resetData.id,encrptedPassword)
//         .then(updatePasswordResponse=>{
//             resolve("PASSWORD UPDATED SUCCESSFULL")
//         })
//         .catch(err=>{
//             reject("ERROR OCCURED WHILE UPDATING PASSWORD")
//         })
//     })
//   }catch(e){
//       console.log(e)
//   }
// }

async resetNewService(resetData){
      try{
        let encrptedPassword=utility.passwordEncrypt(resetData.password)
       

        let updatedResult=await userModel.updateNewPassword(resetData.id,encrptedPassword)
        if(updatedResult==true)
        {
            return true
        }else{
            return false
        }

      }catch(e){
        console.log(e)
      }
              
                        
      }
























}
module.exports = { UserService }
// let UserServiceObject=new UserService()
// module.exports=UserServiceObject