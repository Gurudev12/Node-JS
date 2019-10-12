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
const redis = require("redis");
const client = redis.createClient();
const redisService = require("../service/redisService")
class UserUtility {

    verifyToken(req,res,next){
        let response = {};
        let token = req.headers.token;

        if (token) {
            jwt.verify(token, config.secretKey, (err, data) => {
                if (err) {
                    console.log("ERROR", err)
                    response.success = false;
                    response.message = "YOUR TOKEN IS INVALID";
                    response.error = err;
                    return res.status(400).send(response);
                }
                else {
                    let validToken = token

                    redisService.redisGetter( data._id + "loginToken", (err, reply)=>{
                        if(err){
                            console.log("UTILI ERRRR",err);
                            
                        }else{
                            console.log("DDDDDDDDDDDDDDDDATATAAAAAAA",reply);
                        }

                    })
                    // client.get(data._id + "loginToken", (err, reply) => {
                    //     if (err) {
                    //         response.success = false;
                    //         response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
                    //         response.error = err;
                    //         return res.status(400).send(response);
                    //     }
                    //     else {
                    //         let redisValidToken = reply
                          
                    //                 if (validToken == redisValidToken) {
                    //                     req.token = data;   //this data refers to 'redisSavedToken' verify method
                    //                     next();
                    //                 }
                    //                 else {
                    //                     console.log("TOKEN IS NOT VERIFIED")
                    //                     response.success = false;
                    //                     response.message = "BOTH TOKENS ARE DIFFERENT";
                    //                     return res.status(400).send(response);
                    //                 }
                    //     }
                    // })
                }
            })
        } else {
            response.success = false;
            response.message = "TOKEN NOT GOT";
            return res.status(400).send(response);
            
        }

    }








    
    verifyTokenWithRedis(req, res, next) {
        let response = {};
        try{

            let token = req.headers.token;
            if (token) {
                jwt.verify(token, config.secretKey, (err, data) => {
                    if (err) {
                        console.log("ERROR", err)
                        response.success = false;
                        response.message = "YOUR TOKEN IS INVALID";
                        response.error = err;
                        return res.status(400).send(response);
                    }
                    else {
                        let validToken = token
    
                        client.get(data._id + "loginToken", (err, reply) => {
                            if (err) {
                                response.success = false;
                                response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
                                response.error = err;
                                return res.status(400).send(response);
                            }
                            else {
                                let redisValidToken = reply
                              
                                        if (validToken == redisValidToken) {
                                            req.token = data;   //this data refers to 'redisSavedToken' verify method
                                            next();
                                        }
                                        else {
                                            console.log("TOKEN IS NOT VERIFIED")
                                            response.success = false;
                                            response.message = "BOTH TOKENS ARE DIFFERENT";
                                            return res.status(400).send(response);
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
        }catch(e){
            return res.status(400).send(e)
        }
    }














//RESET AND FORGET

    // verifyTokenWithRedis(req, res, next) {
    //     let response = {};
    //     try{

    //         let token = req.headers.token;
    //         if (token) {
    //             jwt.verify(token, config.secretKey, (err, data) => {
    //                 if (err) {
    //                     console.log("ERROR", err)
    //                     response.success = false;
    //                     response.message = "YOUR TOKEN IS INVALID";
    //                     response.error = err;
    //                     return res.status(400).send(response);
    //                 }
    //                 else {
    //                     let validToken = token
    
    //                     client.get(data._id + "forgotToken", (err, reply) => {
    //                         if (err) {
    //                             response.success = false;
    //                             response.message = "ERROR WHILE GETTING TOKEN FROM REDIS";
    //                             response.error = err;
    //                             return res.status(400).send(response);
    //                         }
    //                         else {
    //                             let redisSavedToken = reply
    //                             jwt.verify(redisSavedToken, config.secretKey, (err, data) => {
    //                                 if (err) {
    //                                     response.success = false;
    //                                     response.message = "REDIS TOKEN IS INVALID";
    //                                     response.error = err;
    //                                     return res.status(400).send(response);
    //                                 }
    //                                 else {
    //                                     let redisValidToken = redisSavedToken
    
    //                                     if (validToken == redisValidToken) {
    //                                         console.log("TOKEN IS VERIFIED")
    //                                         req.token = data;   //this data refers to 'redisSavedToken' verify method
    //                                         next();
    //                                     }
    //                                     else {
    //                                         console.log("TOKEN IS NOT VERIFIED")
    //                                         response.success = false;
    //                                         response.message = "BOTH TOKENS ARE DIFFERENT";
    //                                         return res.status(400).send(response);
    //                                     }
    //                                 }
    //                             })
    //                         }
    
    //                     })
    //                 }
    //             })
    //         } else {
    //             response.success = false;
    //             response.message = "TOKEN NOT GOT";
    //             return res.status(400).send(response);
                
    //         }
    //     }catch(e){
    //         return res.status(400).send(e)
    //     }
    // }











































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
        let token = jwt.sign(payload, config.secretKey, { expiresIn: '12hr' });
        return token;
    }
}
let userUtilityObject = new UserUtility()
module.exports = userUtilityObject
