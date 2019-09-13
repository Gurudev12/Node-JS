chatApp.controller('getUserDetailCtrl',function($scope,getUserDetailService){
    
    // $scope.getUserData=function(){
    // }

        getUserDetailService.getUserDetailServiceUser($scope);   
    
    

    /*get message controller************* */
    $scope.getUserMessage=function(x)
    {

     getUserDetailService.getUserMessageServiceUser($scope)
    
    }
    /************ */
})
