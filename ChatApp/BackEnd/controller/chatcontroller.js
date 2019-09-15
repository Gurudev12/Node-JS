
const chatService=require('../services/chatservice')
//storing chat history
exports.chatAppDetailController=(req,callback)=>{
    
         chatAppDetail={
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
                return err;
            }
            else{
                console.log("Saved operation successfully")
                return  callback(null,data)
            }
        })

}






//return back chat data from database
exports.getChatAppDataController=(req,res)=>{

 
    let error = req.validationErrors()
    if(error)
    {
        return res.status(400).send(error)
    }
    else
    {
       chatService.getChatAppDataService((err,data)=>{
            if(err)
            {
                return res.status(400).send(err)
            }
            else{
                return res.status(200).send(data)
            }
        })
    }
}