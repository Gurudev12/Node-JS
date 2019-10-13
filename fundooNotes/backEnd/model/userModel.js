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
const mongoose = require("mongoose");
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
        type: String
    },
    isVerify:{
        type:Boolean
    },
    imageUrl:{
        type:String
    }
    
},
    {
        timestamps: true,
    });
class UserClass {
    constructor() {
        this.User = mongoose.model("registeredCollection", UserSchema);

    }
   /****************************CREATE NEW USER***********************************************/
    /***
     * @description-this method will create new entry in database
     ***/
    create(paramObject){
    
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
                 
                    };
                    resolve(newRegisterUser);
                })
                .catch(err => {
                    reject(err);
                });
        });
    /***
     * @description-This method will read data in database
     ***/
    }
    read (searchBy) {
        return new Promise((resolve, reject) => {
            this.User.find(searchBy)       
                .then((data) => {
                    if (data.length > 0) {
                        resolve(data);
                    }
                    else {
                        resolve();
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    
    }
    /***
     * @description-This method will update the corresponding entry in databass
     ***/
    update(findValue,updateValue){

        return new Promise((resolve, reject) => {
            this.User.updateOne( findValue , { $set: updateValue })   
                .then((data) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
}
}   
let UserClassObject = new UserClass();
module.exports = UserClassObject;
