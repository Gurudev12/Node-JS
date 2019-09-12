var validator = require('express-validator');
const chatService=require('../services/chatservice')
//storing chat history
exports.chatAppDetailController=(req,res)=>{
    console.log("i m in controller")

    let error=req.validationErrors()
    
    if(error)
    {
        return res.status(400).send(error)
    }
    else{
        let chatAppDetail={
            senderId:req.body.senderId,
            senderName:req.body.senderName,
            receiverId:req.body.receiverId,
            receiverName:req.body.receiverName,
            message:req.body.message
        }
        chatService.chatAppDetailService(chatAppDetail,(err,data)=>{
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