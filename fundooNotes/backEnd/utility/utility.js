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
const underscore = require("underscore")
class UserUtility {

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
  
    /********************************************/
}
let userUtilityObject = new UserUtility()
module.exports = userUtilityObject
