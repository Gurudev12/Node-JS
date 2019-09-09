chatApp.controller('forgetPasswordCtrl',function($scope,forgetPasswordService){

    console.log("forget password called");
    
    $scope.forgetPassword=function(){
        let forgotPasswordData={
            'email':$scope.email
        }
        forgetPasswordService.forgetPasswordServicesUser(forgotPasswordData);
    }
})