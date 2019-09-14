const mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    senderId:{
        type:String,
        required:[true,"sender id is empty"]
    },
    
    senderName:{
        type:String,
        required:[true,"sender name is empty"]
    },

    receiverId:{
        type:String,
        required:[true,"receiver id is empty"]
    },

    receiverName:{
        type:String,
        required:[true,"Receiver name is empty"]
    },
    message:{
        type:String,
        required:[true,"message is empty"]}
    },
    {
    timestamps: true
    });

    //creating chatModel
    let chatModel= mongoose.model('chatDetail',chatSchema);

    exports.chatAppDetailModel=(chatAppDetail,callback)=>
    {
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
                    return callback(null,data)
                }
            })
    }
//fetching chatting data from database
exports.getChatAppDataModel=(callback)=>{

    chatModel.find({},(err,chatData)=>{
    if(err)
    {
        return callback(err)
    }
    else if(chatData.length>0)
    {
        
        return callback(null,chatData)
    }
    else
    {
        return callback(null,"data is not present")
    }
    })  
    };
