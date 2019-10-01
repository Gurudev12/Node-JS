/*************************************************************************
 * @Execution        :1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : It contain only CRUD operations
 *                                     
 * 
 * @file            : userModel.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
const mongoose = require('mongoose')
let UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is empty"]
    },
    lastName: {
        type: String,
        required: [true, "lastName is empty"]
    },
    email: {
        type: String,
        required: [true, "email in proper format"]
    },
    userType: {
        type: String,
        required: [true, "login type required"]
    },
    password: {
        type: String,
        required: [true, "password is empty"]
    },
    loginToken: {
        type: String,
    },
    isVerify:{
        type:Boolean,
    }
},
    {
        timestamps: true,
    })
class UserClass {
    constructor() {
        this.User = mongoose.model('registeredCollection', UserSchema)

    }

    /***************************FIND EMAIL************************************************/
    //this method will check the email is already present in database or not
    findEmail = (email) => {
            return new Promise((resolve, reject) => {
                this.User.find({ 'email': email })        
                    .then((data) => {
                        if (data.length > 0) {
                            resolve(data)
                        }
                        else {
                            resolve();
                        }
                    })
                    .catch((err) => {
                        reject("EMAIL IS NOT PRESENT")
                    })
            })
       
    }
///
///findEmail= read()    email=paramObject
///
read = (email) => {
    return new Promise((resolve, reject) => {
        this.User.find({ 'email': email })        
            .then((data) => {
                if (data.length > 0) {
                    resolve(data)
                }
                else {
                    resolve();
                }
            })
            .catch((err) => {
                reject("EMAIL IS NOT PRESENT")
            })
    })

}

    /****************************CREATE NEW USER***********************************************/
    /***
     * @description-this method will create new entry in database
     ***/
    createNewUser = (paramObject) => {
    
        return new Promise((resolve, reject) => {
            let newUser = new this.User({
                "firstName": paramObject.firstName,
                "lastName": paramObject.lastName,
                "email": paramObject.email,
                "userType": paramObject.userType,
                "password": paramObject.password,
                "isVerify":false
            });

            newUser.save()
                .then(savedUser => {
                    let newRegisterUser={
                        "_id":savedUser._id,
                        "firstName": savedUser.firstName,
                        "lastName": savedUser.lastName,
                        "email": savedUser.email,
                        "userType": savedUser.userType,
                 
                    }
                    resolve(newRegisterUser)
                })
                .catch(err => {
                    reject({ "Error occured while new user saved": err })
                })
        })
       
    }


    updateRegistrationDetail=(userId_id)=>{

            return new Promise((resolve, reject) => {
                this.User.updateOne({ _id: userId_id }, { $set: { isVerify: true } })   
                    .then(() => {
                        resolve("REGISTRTION VERIFIED SUCCESSFULL")
                    })
                    .catch(err => {
                        reject("REGISTRTION VERIFICATION FAILED")
                    })
    
            })
    }
     /***
     * @description-It will save token  to perticular login user based on its unique id.
     */
    updateToken = (userData, tokenData) => {
        
            return new Promise((resolve, reject) => {

                this.User.updateOne({ _id: userData._id }, { $set: { loginToken: tokenData } })
                    .then(savedTokenResponse => {
                    
                        let loginResponse = {
                            "success": true,
                            "message": "LOGIN SUCCESSFUL",
                            data:{
                                "firstName":userData.firstName,
                                "lastName":userData.lastName,
                                "email":userData.email,
                                "userType":userData.userType
                            },
                            "token": tokenData
                        }
                        resolve(loginResponse)
                    
                    })
                    .catch(err => {
                        reject("REJECTED TOKEN ERROR")
                    })
    
            })
    }

async updateNewPassword(id, newPassword){
    try{
       let updatedResult=await this.User.updateOne({ _id: id }, { $set: { password: newPassword } })    //{ _id:id },
       if(updatedResult.nModified==1){
           return true
       }else{
        return false
       } 
    }catch(e){
           return "Exception ERROR"
       }
}

}   
let UserClassObject = new UserClass();
module.exports = UserClassObject;
