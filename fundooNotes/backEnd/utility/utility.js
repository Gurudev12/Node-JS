/**************************************************************************
 * Execution        :
 * 
 * Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : utility.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')

const redisService = require("../service/redisService")
const underscore = require("underscore")
class UserUtility {

    //This is login token verify
    tokenVerify(req, res, next) {
        let response = {};
        try {

            let token = req.headers.token;
            if (token) {
                jwt.verify(token, config.secretKey, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = "YOUR TOKEN IS INVALID";
                        response.error = err;
                        return res.status(400).send(response);
                    }
                    else {
                        let validToken = token
                        redisService.redisGetter(data._id + "loginToken", (err, reply) => {
                            if (err) {
                                response.success = false;
                                response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
                                response.error = err;
                                return res.status(400).send(response);
                            }
                            else {
                                let redisToken = reply
                                if (validToken == redisToken) {
                                    req.token = data;   //this data refers to 'jwt.verify()' method
                                    next();
                                }
                            }
                        })
                    }
                })
            } else {
                response.success = false;
                response.message = "TOKEN NOT GOT";
                return res.status(400).send(response);
            }
        } catch (e) {
            return res.status(400).send(e)
        }
    }
    /********************************************************************************** */
    //This is for resetTokenVerify
    resetTokenVerify(req,res,next) {
        let response = {};
        try {

            let token = req.headers.token;
            if (token) {
                jwt.verify(token, config.secretKey, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = "YOUR TOKEN IS INVALID";
                        response.error = err;
                        return res.status(400).send(response);
                    }
                    else {
                        let validToken = token
                        redisService.redisGetter(data._id + "forgotToken", (err, reply) => {
                            if (err) {
                                response.success = false;
                                response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
                                response.error = err;
                                return res.status(400).send(response);
                            }
                            else {
                                let redisResetToken = reply
                                if (validToken == redisResetToken) {
                                    req.body._id = data._id;   //this data refers to 'jwt.verify()' method
                                    next();
                                }
                            }
                        })
                    }
                })
            } else {
                response.success = false;
                response.message = "TOKEN NOT GOT";
                return res.status(400).send(response);
            }
        } catch (e) {
            return res.status(400).send(e)
        }
    }
    /*******************************************************************/
    //This is for verify registration token
    registrationTokenVerify(req,res,next) {
        let response = {};
        try {

            let token = req.headers.token;
            console.log("UTILITY TOKEN",token);
            
            if (token) {
                jwt.verify(token, config.secretKey, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = "YOUR TOKEN IS INVALID";
                        response.error = err;
                        return res.status(400).send(response);
                    }
                    else {
                        let validToken = token
                        redisService.redisGetter(data._id + "registrationToken", (err, reply) => {
                            if (err) {
                                console.log("REDIS GETTEERR ERR",err);
                                
                                response.success = false;
                                response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
                                response.error = err;
                                return res.status(400).send(response);
                            }
                            else {
                                console.log("REDIS GETTER",reply);
                                
                                let redisRegistrationToken = reply
                                if (validToken == redisRegistrationToken) {
                                    req.body._id = data._id;   //this data refers to 'jwt.verify()' method
                                    next();
                                }
                            }
                        })
                    }
                })
            } else {
                response.success = false;
                response.message = "TOKEN NOT GOT";
                return res.status(400).send(response);
            }
        } catch (e) {
            return res.status(400).send(e)
        }
    }
    /*********************************************************************/
    notePagination(redisData, pageNo) {
        return new Promise((resolve, reject) => {
            let noteLength = redisData.length;
            let partition = 2;
            let pages = underscore.chunk(redisData, partition)
            
            if (pageNo == undefined || pageNo== 1) {
                resolve(pages[0])
            }else{
                resolve(pages[pageNo-1])
            }

        })


    }
   
    /***********
        *@description-This method will encrypt the plaintext password.
        * *********/
    passwordEncrypt = (password) => {
        let saltRounds = 10
        let salt = bcrypt.genSaltSync(saltRounds)
        let encrptedPass = bcrypt.hashSync(password, salt)
        return encrptedPass
    }
    /***********
     *@description-This method will create new token at the time of login,forgetPassword
     * *********/
    createNewToken = (payload) => {
        let token = jwt.sign(payload, config.secretKey, { expiresIn: '24hr' });
        return token;
    }
     /****************************************************************************************************/
  
 verifyToken = (req, res, next) => {
    try {
        let token = req.headers.token;
        if (token) {

            jwt.verify(token, config.secretKey, (err, data) => {

                //data contain({ _id: '5d75e97800a7b9335ace7796', iat: 1568008896, exp: 1568012496 })

                if (err) {
                    res.status(400).send(err + " Token has expired")
                } else {
                    // req.body.content=data;
                    req.token = data
                    console.log("REQUESt", req.token)
                    next();
                }

            })
        } else {
            res.status(400).send("Token not got")
        }
    } catch (e) {
        return res.status(500).send(e)

    }
}

    /********************************************/
}
let userUtilityObject = new UserUtility()
module.exports = userUtilityObject
