const mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    senderId:String,
    senderName:String,
    receiverId:String,
    receiverName:String,
    message:String
    },
    {
    timestamps: true
    });

    let chatModel= mongoose.model('chatDetail',chatSchema);

    exports.chatAppDetailModel=(chatAppDetail,callback)=>
    {
       console.log("i m in model")
            let newChatDetail=new chatModel({

                senderId:chatAppDetail.senderId,
                senderName:chatAppDetail.senderName,
                receiverId:chatAppDetail.receiverId,
                receiverName:chatAppDetail.receiverName,
                message:chatAppDetail.message
            })
            newChatDetail.save((err,data)=>
            {
                if(err)
                {
                    return callback()
                }
                else
                {
                    return callback(null,"Chat history save successfully..!!")
                }
            })
    }
