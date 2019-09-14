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
})
