let chatModel=require('../model/chatmodel')
exports.chatAppDetailService=(chatAppDetail,callback)=>{
    console.log("i m in service")

    chatModel.chatAppDetailModel(chatAppDetail,(err,data)=>{
        if(err)
        {
            return callback(err)
        }
        else{
            return callback(null,data)
        }

    })
}

//service for getting chat details
exports.getChatAppDataService=(callback)=>
{
    chatModel.getChatAppDataModel((err,data)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,data)
        }

    })
}