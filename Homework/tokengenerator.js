let jwt=require('jsonwebtoken');

//creating a new token
function createNewToken()
{
let token=jwt.sign({name:'guru'},'secret',{expiresIn:20});
console.log(token)

}

// verifyToken=(req,res,next)=>{

//     let token=req.headers['token'];

//     if(token){
//         jwt.verify(token,'privateKey',(err,decoded)=>{
//             if(err)
//             {
//                 res.status(400).send(err +" Token has expired")
//             }else{
//                 console.log("token "+JSON.stringify(decoded));
//                 req.decoded=decoded;
//                 next();
//             }
    
//         })

//     }else{
//         console.log("token not got");
//         res.status(400).send(err +" Token not got")
        
//     }
// }
module.exports=createNewToken()
