const jwt=require('jsonwebtoken')
require('dotenv').config()
class UserUtility{

    verifyToken=(req,res,next)=>{

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
    }
}
let userUtilityObject=new UserUtility()
module.exports=userUtilityObject
