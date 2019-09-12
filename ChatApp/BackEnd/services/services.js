 
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
/*reset password service******************************* */
exports.resetPasswordService =(id,newPassword,callback)=>
{

        model.resetPasswordModel(id,newPassword,(err, data) => {
            if (err) {
                 
                return callback(err)
            } else {
                
                return callback(null, data)
            }

        })
    
}
/****************newchanges********************************************/ 
exports.userDataService=(callback)=>
{
    model.userDataModel((err,data)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,data)
        }

    })
}
// let chatModel=require('../model/chatmodel')
// exports.chatAppDetailService=(chatAppDetail,callback)=>{
//     console.log("i m in service")

//     chatModel.chatAppDetailModel(chatAppDetail,(err,data)=>{
//         if(err)
//         {
//             return callback(err)
//         }
//         else{
//             return callback(null,data)
//         }

//     })
// }