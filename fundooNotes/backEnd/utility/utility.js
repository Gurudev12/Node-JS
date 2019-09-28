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
                console.log("token not got");
                res.status(400).send("Token not got")
            }
        }catch(e)
        {
            return res.status(500).send(e)
        }  

    
}
}
let userUtilityObject=new UserUtility()
module.exports=userUtilityObject
