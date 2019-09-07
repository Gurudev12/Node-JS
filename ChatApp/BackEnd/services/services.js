const model=require('../model/model')
exports.registrationService=(userDetail,callback)=>
{
    model.registrationModel(userDetail,(err,data)=>{
        
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
}
/*login service******************************************************* */
exports.loginService=(loginDetail,callback)=>
{
    model.loginModel(loginDetail,(err,data)=>{
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
}
/* forgot password service******************************************************* */
exports.forgotPasswordService=(forgotPasswordDetail,callback)=>
{
    console.log("service forgot")
    model.forgotPasswordModel(forgotPasswordDetail,(err,data)=>{
     
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
}