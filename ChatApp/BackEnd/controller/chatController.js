
const chatService=require('../services/chatService')

class UserChatController
{

    //storing messages history
chatAppDetailController=(req,callback)=>{

    try{
        let chatAppDetail={
            senderId:req.senderId,
            senderName:req.senderName,
            receiverId:req.receiverId,
            receiverName:req.receiverName,
            message:req.message
        }
        chatService.chatAppDetailService(chatAppDetail,(err,data)=>{
            if(err)
            {
                console.log("Error occured",err)
                callback (err);
            }
            else{
                console.log("Saved operation successfully")
                callback(null,data)
            }
        })

    }catch(e){
    console.log(e);
    }   

}

//return back chat data from database
getChatAppDataController=(req,res)=>{

    try{
        let response={}
    let error = req.validationErrors()
    if(error)
    {
        response.success=false;
        response.error=error;
        return res.status(400).send(response)
    }
    else
    {
       chatService.getChatAppDataService((err,data)=>{
            if(err)
            {
                response.success=false;
                response.message="Getting all message failed"
                response.error=error;
                return res.status(400).send(response)
            }
            else{
                response.success=true;
                response.message="All message successfully get"
                response.content=data
                return res.status(200).send(response)
            }
        })
    }
    
    }catch(e)
    {
        console.log(e)
    }
}
}

const userChatControllerObject=new UserChatController();
module.exports=userChatControllerObject;