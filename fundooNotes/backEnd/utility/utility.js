/*************************************************************************
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
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
// require('dotenv').config()
class UserUtility{
   
        verifyToken=(req,res,next)=>{
            try{
            let token=req.headers.token;
    
            if(token){
                // jwt.verify(token,process.env.SECRETKEY,(err,data)=>{
                    jwt.verify(token,'secretKey',(err,data)=>{
                    //data contain({ _id: '5d75e97800a7b9335ace7796', iat: 1568008896, exp: 1568012496 })
                
                    if(err){
                        res.status(400).send(err +" Token has expired")
                    }else{
                    req.body.content=data;
                    next();
                    }
            
                })
            }else{
                res.status(400).send("Token not got")
            }
        }catch(e)
        {
            return res.status(500).send(e)
        }  

    
}
/***********
    *@description-This method will encrypt the plaintext password.
    * *********/
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
}
let userUtilityObject=new UserUtility()
module.exports=userUtilityObject
