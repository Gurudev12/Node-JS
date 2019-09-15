chatApp.controller('getUserDetailCtrl',function($scope,getUserDetailService){
    
    $scope.getUserData=function(){
        getUserDetailService.getUserDetailServiceUser($scope); 
    }

    $scope.getUserData()
        
    /*get message controller************* */
    $scope.getUserMessage=function(x)
    {
    /*Here set the receiverId and receiverName by clicking on perticular user*/
    console.log("user info",x)
    localStorage.setItem('receiverId',x._id)
    localStorage.setItem('receiverName',x.firstname)

     getUserDetailService.getUserMessageServiceUser($scope)
    
    }
    

    $scope.allMessage=[];

    $scope.sendMessage=function(){

        sendObj={
        "senderId":localStorage.getItem('loginId'),
        "senderName":localStorage.getItem('firstname'),
        "receiverId":localStorage.getItem('receiverId'),
        "receiverName":localStorage.getItem('receiverName'),
        "message":$scope.message
        }
        console.log("message content============>",sendObj)
        //following first parameter is name of message,and second is actual content
        socket.emit("messageContainer",sendObj)
        }

        socket.on("message",(message)=>{

            if (localStorage.getItem('loginId') == message.senderId || localStorage.getItem('receiverId') == message.receiverId){

                $scope.allMessage.push(message);
            }
        })

})
