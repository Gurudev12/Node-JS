let chatModel=require('../model/chatmodel')

class UserChatService
{
//storing chat details to database
chatAppDetailService=(chatAppDetail,callback)=>{
    try{
 
     chatModel.chatAppDetailModel(chatAppDetail,(err,data)=>{
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
 
 //service for getting chat details
getChatAppDataService=(callback)=>
 {
     try{
     chatModel.getChatAppDataModel((err,data)=>{
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

const userChatServiceObject=new UserChatService();
module.exports=userChatServiceObject
