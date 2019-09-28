/*************************************************************************
 * Execution        :
 * 
 * Purpose          : 
 *                    
 *                     
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
            this.User.find({ 'email': email })        //['_id','email','password']
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
            let user = new this.User({
                "firstName": paramObject.firstName,
                "lastName": paramObject.lastName,
                "email": paramObject.email,
                "userType": paramObject.userType,
                "password": paramObject.password,
                "isVerify":false
            });

            user.save()
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
                    console.log("Error occured while new user saved")
                    reject({ "Error occured while new user saved": err })
                })
        })
    }


    updateRegistrationDetail=(userId_id)=>{
        // return new Promise((resolve,reject)=>{
          

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
    /*********login and save save token***************************************************/
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
                        "id": userData._id,
                        "firstName": userData.firstName,
                        "lastName": userData.lastName,
                        "email": userData.email,
                        "token": userData.loginToken
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
    updatePassword = (id, newPassword) => {

        return new Promise((resolve, reject) => {
            this.User.updateOne({ _id: id }, { $set: { password: newPassword } })    //{ _id:id },
                .then(() => {
                    resolve("PASSWORD UPDATED SUCCESSFUL")
                })
                .catch(err => {
                    reject("ERROR WHILE UPDATING PASSWORD")
                })

        })

    }
}   
let UserClassObject = new UserClass();
module.exports = UserClassObject;
