 
/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : It provides the differenet service. 
 *                    
 *                     
 *                    
 * 
 * @file            : service.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 06-09-2019
 * 
 **************************************************************************/
const model=require('../model/model')

class UserService{

registrationService=(userDetail,callback)=>
{
    try{
    model.registrationModel(userDetail,(err,data)=>{
        
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
    }catch(e)
    {
        console.log(e)
    }
}
/*login service******************************************************* */
loginService=(loginDetail,callback)=>
{
    try{

    model.loginModel(loginDetail,(err,data)=>{
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
    }catch(e)
    {
        console.log(e)
    }
}
/* forgot password service******************************************************* */
forgotPasswordService=(forgotPasswordDetail,callback)=>
{
   try{
    model.forgotPasswordModel(forgotPasswordDetail,(err,data)=>{
     
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
    }catch(e)
    {
        console.log(e)
    }
}
/*reset password service******************************* */
resetPasswordService =(id,newPassword,callback)=>
{
    try{
        model.resetPasswordModel(id,newPassword,(err, data) => {
            if (err) {
                 
                return callback(err)
            } else {
                
                return callback(null, data)
            }

        })
    }catch(e)
    {
        console.log(e)
    }
    
}
/****************newchanges********************************************/ 
userDataService=(callback)=>
{
    try{
    model.userDataModel((err,data)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,data)
        }

    })
    }catch(e)
    {
        console.log(e)
    }
}
}
const userServiceObject=new UserService()
module.exports=userServiceObject;
