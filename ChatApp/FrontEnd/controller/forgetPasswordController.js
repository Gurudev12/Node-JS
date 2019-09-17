chatApp.controller('forgetPasswordCtrl',function($scope,forgetPasswordService){

    console.log("forget password controller");
    
    $scope.forgetPassword=function(){
        let forgotPasswordData={
            'email':$scope.email
        }
        forgetPasswordService.forgetPasswordServicesUser(forgotPasswordData,$scope);
    }
})