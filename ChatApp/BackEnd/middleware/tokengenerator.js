let jwt=require('jsonwebtoken');

//creating a new token
exports.createNewToken=(payload)=>
{
let token=jwt.sign(payload,'privatekey',{expiresIn:'1hr'});
console.log(token)
return  token;
}













// verify token 
exports.verifyToken=(req,res,next)=>{

    let token=req.headers['token'];
    if(token){
        jwt.verify(token,'privatekey',(err,data)=>{
            //data contain({ _id: '5d75e97800a7b9335ace7796', iat: 1568008896, exp: 1568012496 })
        
          
            if(err)
            {
                res.status(400).send(err +" Token has expired")
            }else{
            req.id=data._id
             next();
                
            }
    
        })
    }else{
        console.log("token not got");
        res.status(400).send(err +" Token not got")
    }
}