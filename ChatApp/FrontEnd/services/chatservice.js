chatApp.service('getUserDetailService', function ($http, $location) {
   
    this.getUserDetailServiceUser = function ($scope){
        $http(
            {
                method:'GET',
                url:'http://localhost:4000/userData'

            }).then(function (response)
                     {                    
            //in the form of id,first name last name.
                        $scope.getUserData=response.data //this is actual getUserData in chat.html
                        console.log($scope.getUserData)


                //here we are getting data of login user for comparing sender id(login user) & db sender id 
                        // let loginId=localStorage.getItem('loginId')
                        // let loginName= localStorage.getItem('firstname') 
                    })

              .catch(function(error){

                    console.log("Nothing is present")
                });
    }

    /*get message service to get ('senderId,senderName,receiverId,receiverName,message)*/
    this.getUserMessageServiceUser=function($scope){
        $http(
            {
                method:'GET',
                url:'http://localhost:4000/messageChatAppData'

            }).then(function(response)
                     {         
            //In this response we will get ('senderId,senderName,receiverId,receiverName,message) and store that response in 'messageObj'
                        let messageObj=response.data
                        // console.log("responce",response.data)
                        let message=[]
                        let receiverId=localStorage.getItem('receiverId')
                        let receiverName=localStorage.getItem('receiverName')
                        ///////
                        $scope.receiverClickId=receiverId
                        $scope.senderLoginId= localStorage.getItem('loginId') 
                        ///////
                        let loginId=localStorage.getItem('loginId')
                        let loginName= localStorage.getItem('firstname') 
                        
                        



                        for(let i=0;i<messageObj.length;i++)
                        {
                            // console.log("receiver id in local storage",receiverId)
                            // console.log("receiverName store in localstorage",receiverName)
                            // console.log("***************")
                            // console.log("login id in local storage",loginId)
                            // console.log("login Name store in localstorage",loginName)

                            if(((messageObj[i].senderId===loginId && messageObj[i].receiverId===receiverId) 
                                ||(loginId===messageObj[i].receiverId && receiverId===messageObj[i].senderId)))

                            {
                                // console.log("MessageObject",messageObj[i])
                                message.push(messageObj[i])
                            }
                        }
                        
                        $scope.allMessage=message;
                        // console.log("All messages", $scope.allMessage)
                      
                        
                    })

              .catch(function(error){

                    console.log("Nothing is present",error)
                });
    }
    /*get message service************* */
});


