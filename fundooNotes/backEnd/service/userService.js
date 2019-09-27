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

class UserService {

    passwordEncrypt=(password)=>{
        let saltRounds = 10
        let salt = bcrypt.genSaltSync(saltRounds)
        let encrptedPass = bcrypt.hashSync(password, salt)
        return encrptedPass
    }
/***********
 *@description-This method will create new token at the time of login,forgetPassword
 * *********/
 createNewToken=(payload)=>{
        // let token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'2hr'});
        let token=jwt.sign(payload,'secretKey',{expiresIn:'2hr'});
        return token;

    }


/****
 * @description-This is  registration service while new registration
 ****/
    registrationService=(paramObject)=>{
        return new Promise((resolve, reject) => {

            /****
            * @description-Checking that user email id is allready present or not
            ****/
            userModel.findEmail(paramObject.email)
                .then((data) => {
                    if(data){
                        reject('email id allready registered')
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
                        "password": this.passwordEncrypt(paramObject.password)
                    }

                     /****
                        * @description-This method will send that object to userModel.
                        ****/
                    userModel.createNewUser(registrationDetail)
                        .then(data => {
                            resolve({ "data": data })
                        })
                        .catch(err => {
                            reject(err)
                        })
                    }
                })
                .catch(err => {
                    console.log("servicee reject", err)
                    reject(err)
                })
        })
    }

/****
 * @description-This is login service
 ****/

    loginService=(loginDetail)=>{
        
        return new Promise((resolve, reject) => {
            /****
            * @description-Checking that user email id is already present or not.
            ****/
            userModel.findEmail(loginDetail.email)
                .then(userData => {
                    
                     /****
                     * @description-If email is matched then compare password of login user with its actual password
                     ****/
                    bcrypt.compare(loginDetail.password,userData[0].password,(err,result)=>
                    {
                        if(result){
                            console.log("password matched")
                            let payload={
                                "id":userData[0].id
                            }
                            //Generate new token
                             /****
                            * @description-creating new token while login and store it to database
                            ****/
                            let loginToken=this.createNewToken(payload)
                
                            //after generating new token saved to database
                                userModel.loginTokenSave(userData[0],loginToken)   //userData send array and userData[0] send object
                                .then(updatedData=>{
                                    console.log("UPDATED DATA WITH TOKEN IN DATABASE====>",updatedData)
                                    resolve(updatedData)
                                })
                                .catch(error=>{
                                    console.log("ERROR IN UPDATED DATA WITH TOKEN IN DATABASE===>",error)
                                    reject({})
                                
                                })  
                        }
                        else{
                            console.log("password not matched")
                            reject("PASSWORD NOT MATCHED")
                        }
                    })
                    
                })
                .catch(err => {
                    console.log("login failed")
                 reject("LOGIN FAILED....!!!1")
                })
        })
    }
/*******************************************************************************/
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
                let forgotToken=this.createNewToken(payload)
                console.log("FORGOT TOKEN",forgotToken)
                nodemail.sendMail(foundData[0].email,forgotToken,(err,data)=>{
                    if(err)
                    {
                        console.log("ERROR WHILE SENDIN MAIL")
                        reject("ERROR WHILE SENDIN MAIL")
                    }
                    else
                    {
                        console.log("SEND EMAIL SUCCESSFULLY")
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
/**RESET SERVICE**********************************************************************/
resetService=(resetData)=>{
    
    return new Promise((resolve,reject)=>{

        console.log("RESET DATA ID",resetData.id)
        let encrptedPassword=this.passwordEncrypt(resetData.password)
      
        userModel.updatePassword(resetData.id,encrptedPassword)
        .then(updatePasswordResponse=>{
            resolve(updatePasswordResponse)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

}
module.exports = { UserService }









// let UserServiceObject=new UserService()
// module.exports=UserServiceObject