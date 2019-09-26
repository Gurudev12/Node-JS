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
    loginType: {
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
    }
},
    {
        timestamps: true,
    })
class UserClass {
    constructor() {
        this.User = mongoose.model('registeredCollection', UserSchema)

    }
    /***************************************************************************/
    //this method will check the email is already present in database or not
    findEmail=(email)=>{
        return new Promise((resolve, reject) => {
            this.User.find({ 'email': email })        //['_id','email','password']
                .then((data) => {
                    if (data.length > 0) {
                        resolve(data)
                    }
                    else {
                        console.log("data model===>", data)
                        resolve();
                    }
                })
                .catch((err) => {
                    reject({ "error": false, "message": "Error while database searching" })
                })
        })
    }
    /***************************************************************************/
    //this method will create new entry in database
    createNewUser=(paramObject)=>{
        console.log("model saveuser===>", paramObject)
        return new Promise((resolve, reject) => {
            let user = new this.User({
                "firstName": paramObject.firstName,
                "lastName": paramObject.lastName,
                "email": paramObject.email,
                "loginType": paramObject.loginType,
                "password": paramObject.password
            });

            user.save()
                .then(savedUser => {
                    console.log("user saved successfully", savedUser)
                    resolve({ "data": savedUser })
                })
                .catch(err => {
                    console.log("Error occured while new user saved")
                    reject({ "Error occured while new user saved": err })
                })
        })
    }
    /*********login with token save******************************************************************/
    loginTokenSave=(userData, tokenData)=>{
        return new Promise((resolve, reject) => {

            this.User.updateOne({ _id: userData._id }, { $set: { loginToken: tokenData } })
                .then(savedTokenResponse => {
                    console.log("MODEL TOKEN===>",savedTokenResponse)
                    console.log("USER DATA UPDATED TOKEN===>",userData)
                    let loginResponse={
                        "success":true,
                        "message":"LOGIN SUCCESSFUL",
                        "id":userData._id,
                        "firstName":userData.firstName,
                        "lastName":userData.lastName,
                        "email":userData.email,
                        "token":userData.loginToken
                    }
                    resolve(loginResponse)
                })
                .catch(err => {
                    console.log("TOKEN DATA SAVE ERROR")
                    reject("REJECTED TOKEN ERROR")
                })

        })
    }

    /********UPDATE PASSWORD**********************************************************************/
    updatePassword=(id,newPassword)=>{

        console.log("MODELIDDDDDDDDDD",id)
        console.log("MODElPASSSSSSSS",newPassword)
        return new Promise((resolve,reject)=>{
            this.User.updateOne({ _id:id }, { $set: { password:newPassword }})
            .then(()=>{
                console.log("PASSWORD UPDATED SUCCESSFUL")
                resolve("PASSWORD UPDATED SUCCESSFUL")
            })
            .catch(err=>{
                console.log("ERROR WHILE UPDATING PASSWORD")
                reject("ERROR WHILE UPDATING PASSWORD")
            })

        })

    }
    /*******************************************************************************/
}   //class close
let UserClassObject = new UserClass();
module.exports = UserClassObject;
