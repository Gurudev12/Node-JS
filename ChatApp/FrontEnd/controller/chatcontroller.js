chatApp.controller('getUserDetailCtrl',function($scope,getUserDetailService){
    console.log("i m in chat controller")

    // $scope.getUserData=function(){
    // }
    getUserDetailService.getUserDetailServiceUser($scope);    
   $scope.getUserData
   console.log($scope.getUserData)
})
