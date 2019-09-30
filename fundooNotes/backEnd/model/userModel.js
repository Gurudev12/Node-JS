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
        // required:[true,"token is required"]
    },
    isVerify:{
        type:Boolean
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
    /****************************CREATE NEW USER***********************************************/
    /***
     * @description-this method will create new entry in database
     */
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
                this.User.updateOne({ _id: userId_id }, { $set: { isVerify: true } })    //{ _id:id },
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
                        console.log("USER DTAA MODEL",userData)
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
                        console.log("TOKEN DATA SAVE ERROR")
                        reject("REJECTED TOKEN ERROR")
                    })
    
            })
    }

    /*******************UPDATE PASSWORD*************************************/
    /***
     * @description-It will update the password of perticular  user based on its unique id.
     */
    // updatePassword = (id, newPassword) => {
     
    //         return new Promise((resolve, reject) => {
    //             this.User.updateOne({ _id: id }, { $set: { password: newPassword } })    //{ _id:id },
    //                 .then(() => {
    //                     resolve("PASSWORD UPDATED SUCCESSFUL")
    //                 })
    //                 .catch(err => {
    //                     reject("ERROR WHILE UPDATING PASSWORD")
    //                 })
    
    //         })
    // }

async updateNewPassword(id, newPassword){
    try{
       let updatedResult=await this.User.updateOne({ _id: id }, { $set: { password: newPassword } })    //{ _id:id },
       if(updatedResult.nModified==1){
           return true
       }else{
        return false
       } 
    }catch(e){
           console.log(e)
       }
}

}   
let UserClassObject = new UserClass();
module.exports = UserClassObject;
