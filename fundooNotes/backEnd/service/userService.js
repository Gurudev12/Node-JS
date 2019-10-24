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
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemail = require("./emailService");
const emailExistence = require("email-existence");
const utility = require("../utility/utility");
var shortUrl = require("node-url-shortener");
const redis = require("redis");
const client = redis.createClient();
const redisService = require("../service/redisService");


class UserService {


    /***************************REGISTRATION SERVICE****************************************************/
    /****
     * @description-This is  registration service while new registration
     ****/
    registrationService(paramObject) {
        console.log("BAcckend SERC  ===>", paramObject);

        try {
            return new Promise((resolve, reject) => {

                /****
               * @description-Checking that user email is existing or not
               ****/
                emailExistence.check(paramObject.email, function (error, response) {
                    if (response == true) {
                        /****
                    * @description-Checking that user email id is allready present or not
                    ****/
                        let searchByEmail = { "email": paramObject.email };
                        userModel.read(searchByEmail)
                            .then((data) => {
                                if (data) {
                                    reject("EMAIL IS ALLREADY REGISTER");
                                }
                                else {
                                    /****
                                    * @description-If email is not present then create new object(registrationDetail) 
                                    *              before that password should encrypt.
                                    ****/
                                    let registrationDetail = {
                                        "firstName": paramObject.firstName,
                                        "lastName": paramObject.lastName,
                                        "email": paramObject.email,
                                        // "userType": paramObject.userType,
                                        "password": utility.passwordEncrypt(paramObject.password)
                                    };

                                    /****
                                    * @description-This method will send that object to userModel.
                                    ****/
                                    userModel.create(registrationDetail)

                                        .then(data => {

                                            let payload = {
                                                "_id": data._id
                                            };
                                            let registrationToken = utility.createNewToken(payload);
                                            console.log("REGISTER TOKEN==>",registrationToken);
                                            
                                            //This code for url shortner
                                            shortUrl.short("https://amazon.com", function (err, url) {
                                                // shortUrl.short('http://localhost:4000/registrationVerify/ + registrationToken +', function(err, url){
                                            });

                                            //
                                            //
                                            //
                                            ///
                                            ///
                                            redisService.redisSetter(data._id +"registrationToken", registrationToken)

                                            let registrationVerifyLink = "<p>this is link to REGISTRATION VERIFY</p><a href=\"http://localhost:4000/registrationVerify/" + registrationToken + "\">Registration verify</a>";
                                            let text = "Registration verification link";
                                            nodemail.sendMail(data.email, registrationVerifyLink, text, (error, response) => {
                                                if (error) {
                                                    reject(error);
                                                } else {
                                                    resolve(response);
                                                }
                                            });
                                            resolve("FEEDBACK:CHECK YOUR MAIL TO CONFIRM REGISTRATION");
                                        })
                                        .catch(err => {
                                            //"ERROR OCCURED WHILE CREATING NEW USER"
                                            reject(err);
                                        });
                                }
                            })
                            .catch(err => {
                                //"ERROR OCCURED WHILE FINDING EMIAL IN DATABASE"
                                reject(err);
                            });

                    }
                    else {
                        reject("SORRY THIS EMAIL ID IS NOT EXISTED");
                    }
                });
            });
        } catch (e) {
            let response = {};
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }
    /***************************************************************** */
    registrationVerifyService(userId) {
        try {

            return new Promise((resolve, reject) => {

                let updateValue = { "isVerify": true };
                let searchById = { "_id": userId };
                userModel.update(searchById, updateValue)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        } catch (e) {
            let response = {};
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }

    /******************************LOGIN SERVICE*************************************************/
    /****
     * @description-This is login service.
     ****/
    loginService(loginDetail) {
        try {
            return new Promise((resolve, reject) => {
                /****
                * @description-Checking that user email id is already present or not.
                ****/
                let searchByEmail = { "email": loginDetail.email };
                userModel.read(searchByEmail)
                    .then(userData => {
                        if (userData[0].isVerify == true) {
                            /****
                             * @description-If email is matched then compare password of login user with its actual password
                             ****/
                            bcrypt.compare(loginDetail.password, userData[0].password, (err, result) => {
                                if (result) {

                                    let payload = {
                                        "_id": userData[0]._id
                                    };
                                    //Generate new token
                                    /****
                                   * @description-creating new token while login and store it to database
                                   ****/
                                    let newToken = utility.createNewToken(payload);


                                    //Storing token to redis.
                                    // client.set(userData[0]._id+"loginToken", newToken);

                                    // client.get(userData[0]._id+"loginToken", function (err, reply) {
                                    //     console.log("REPLY OF LOGIN TOKEN=====>", reply.toString());

                                    // })




                                    redisService.redisSetter(userData[0]._id + "loginToken", newToken)
                                        .then(redisResponse => {
                                            let findValue = { "_id": userData[0]._id };
                                            let updateToken = { loginToken: newToken };
                                            userModel.update(findValue, updateToken)   //userData send array and userData[0] send object
                                                .then(updatedData => {

                                                    let loginResponse = {
                                                        "success": true,
                                                        "message": "LOGIN SUCCESSFUL",
                                                        data: {
                                                            "firstName": userData[0].firstName,
                                                            "lastName": userData[0].lastName,
                                                            "email": userData[0].email,
                                                            "userType": userData[0].userType
                                                        },
                                                        "token": newToken
                                                    };
                                                    resolve(loginResponse);
                                                })
                                                .catch(error => {
                                                    reject("ERROR IN UPDATED DATA WITH TOKEN IN DATABASE");
                                                });
                                        })
                                        .catch(err => {
                                            reject(err);
                                        });
                                }
                                else {
                                    reject("PASSWORD NOT MATCHED");
                                }
                            });
                        } else {
                            reject("REGISTRATION VERIFICATION NOT DONE");
                        }
                    })
                    .catch(err => {
                        reject("WRONG EMAIL ID");
                    });
            });
        } catch (e) {
            let response = {};
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }
    /********************FORGOTPASSWORD SERVICE***********************************************************/
    /****
    * @description-This is forgotPassword service
    ****/
    forgotPasswordService(userEmail) {
        try {
            return new Promise((resolve, reject) => {

                /****
                * @description-Checking that user email id is  present or not
                ****/
                let searchByEmail = { "email": userEmail };
                userModel.read(searchByEmail)
                    .then(foundData => {
                        let payload = {
                            "_id": foundData[0]._id
                        };

                        /****
                        * @description-After finding email create new token and send it to perticular emailId
                        ****/
                        let forgotToken = utility.createNewToken(payload);

                        ////
                        //
                        ///
                        ///New change
                        redisService.redisSetter(foundData[0]._id +"forgotToken", forgotToken)
                        .then(data=>{
                            console.log("REGISTR RESPONCE",data);
                            
                        })

                        let forgotLink = "<p>this is link to RESET PASSWORD</p><a href=\"http://localhost:4000/resetPassword" + forgotToken + "\">Reset PassWord</a>";
                        //let forgotLink=process.env.FORGOT_PASSWORD_LINK
                        let text = "Reset password link";
                        nodemail.sendMail(foundData[0].email, forgotLink, text, (err, data) => {
                            if (err) {
                                reject("ERROR WHILE SENDING MAIL");
                            }
                            else {
                                resolve("SEND EMAIL SUCCESSFULLY");
                            }
                        });
                    })
                    .catch(err => {
                        reject("EMAL NOT FOUND IN DATABASE");
                    });
            });
        } catch (e) {
            let response = {};
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }

    /********************RESET PASSWORD SERVICE***********************************************************/

    async resetNewPasswordService(resetData) {
        
        try {
            let encrptedPassword = utility.passwordEncrypt(resetData.password);

            let updateValue = { "password": encrptedPassword };
            let searchById = { "_id": resetData._id };
            let updatedResult = await userModel.update(searchById, updateValue);

            if (updatedResult.nModified==1) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            let response = {};
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }
    /********************UPLOAD IMAGE SERVICE***********************************************************/
    async uploadImageService(uploadData) {
        try {
            let searchById = { "_id": uploadData._id };
            let updateValue = { "imageUrl": uploadData.url };
            let updatedResult = await userModel.update(searchById, updateValue);

            if (updatedResult.nModified == 1) {
                return true
            } else {
                return false
            }

        } catch (e) {
            return e;
        }

    }
}
module.exports = { UserService };


















// let UserServiceObject=new UserService()
// module.exports=UserServiceObject