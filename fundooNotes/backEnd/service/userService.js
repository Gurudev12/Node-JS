/*************************************************************************
 * Execution        :
 * 
 * Purpose          : 
 *                    
 *                     
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
        return new Promise((resolve, reject) => {

             /****
            * @description-Checking that user email is existing or not
            ****/
           emailExistence.check(paramObject.email, function(error, response){
            console.log('res: '+response);
            if(response==true){
                /****
            * @description-Checking that user email id is allready present or not
            ****/
            userModel.findEmail(paramObject.email)
            .then((data) => {
                if(data){
                    reject('EMAIL IS ALLREADY REGISTER')
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
                        console.log("REGISTRATION TOKEN",registrationToken)
                        let verifyLink='<p>this is link to REGISTRATION VERIFY</p><a href="http://localhost:4000/registrationVerify'+registrationToken+'">Reset PassWord</a>'
                        nodemail.sendMail(data.email,verifyLink,(error,response)=>{
                            if(error){
                                console.log("ERROR WHILE SENDING MAIL")
                                reject(error)
                            }else{
                                console.log("CHECK YOUR MAIL TO CONFIRM REGISTRATION")
                                resolve(response)
                            }
                        
                        })
                        resolve({ "data": data,"FEEDBACK":"CHECK YOUR MAIL TO CONFIRM REGISTRATION" })
                    })
                    .catch(err => {
                        console.log("ERROR OCCURED WHILE CREATING NEW USER",err)
                        reject("ERROR OCCURED WHILE CREATING NEW USER")
                    })
                }
            })
            .catch(err => {
                console.log("ERRRRRRRRRRRRROR",err)
                reject("ERROR OCCURED WHILE FINDING EMIAL IN DATABASE")
            })

            }
            else{
                reject("SORRY THIS EMAIL ID IS NOT EXISTED..!")
            }
        });
            
        })
    }
/***************************************************************** */
registrationVerifyService=(_id)=>{
    
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
}

/******************************LOGIN SERVICE*************************************************/
/****
 * @description-This is login service.
 ****/
    loginService=(loginDetail)=>{
        
        return new Promise((resolve, reject) => {
            /****
            * @description-Checking that user email id is already present or not.
            ****/
            userModel.findEmail(loginDetail.email)
                .then(userData => {
                    if(userData){
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
                        console.log("USER CREDENTIAL NOT PRESENT")
                        
                    }
                    
                    //  /****
                    //  * @description-If email is matched then compare password of login user with its actual password
                    //  ****/
                    // bcrypt.compare(loginDetail.password,userData[0].password,(err,result)=>
                    // {
                    //     if(result){
                    //         let payload={
                    //             "id":userData[0].id
                    //         }
                    //         //Generate new token
                    //          /****
                    //         * @description-creating new token while login and store it to database
                    //         ****/
                    //         let loginToken=this.createNewToken(payload)
                
                    //         //after generating new token saved to database
                    //             userModel.updateToken(userData[0],loginToken)   //userData send array and userData[0] send object
                    //             .then(updatedData=>{
                    //                 resolve(updatedData)
                    //             })
                    //             .catch(error=>{
                    //                 reject("ERROR IN UPDATED DATA WITH TOKEN IN DATABASE")
                                
                    //             })  

                    //     }
                    //     else{
                    //         reject("PASSWORD NOT MATCHED")
                    //     }
                    // })
                    
                })
                .catch(err => {
                 reject("EMAIL IS NOT PRESENT....!!!1")
                })
        })
    }
/********************FORGOTPASSWORD SERVICE***********************************************************/
/****
* @description-This is forgotPassword service
****/
forgotPasswordService=(email)=>{
   
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
                        reject("ERROR WHILE SENDIN MAIL")
                    }
                    else
                    {
                        
                        resolve("SEND EMAIL SUCCESSFULLY")
                    }

                })
        })
        .catch(err=>{
            console.log("EMAIL NOT FOUND")
            reject("EMAL NOT FOUND...!!")
        })
    })
    


}
/********************RESET SERVICE**************************************************************/
/****
* @description-This is resetPassword service
****/
resetService=(resetData)=>{
  
    return new Promise((resolve,reject)=>{

        let encrptedPassword=this.passwordEncrypt(resetData.password)
        /****
        * @description-This method will pass the perticular user id and encrypted password to userModel 
        *              for update password .
        ****/
        userModel.updatePassword(resetData.id,encrptedPassword)
        .then(updatePasswordResponse=>{
            resolve("PASSWORD UPDATED SUCCESSFULL")
        })
        .catch(err=>{
            reject("ERROR OCCURED WHILE UPDATING PASSWORD")
        })
    })
}

}
module.exports = { UserService }
// let UserServiceObject=new UserService()
// module.exports=UserServiceObject