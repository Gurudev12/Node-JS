chatApp.controller('forgetPasswordCtrl',function($scope,forgetPasswordService){

    $scope.emailValidation=function(email){
        let pattern=/^([a-zA-Z0-9_\.])+\@(([gmail\yahoo\hotmail\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let res=email.match(pattern);
        if(res){
        $scope.emailVal=false;
        }
        else{
        $scope.emailVal=true;
        }
        }
    
    $scope.forgetPassword=function(){
        console.log("I m in front end controller")
        let forgotPasswordData={
            'email':$scope.email
        }
        forgetPasswordService.forgetPasswordServicesUser(forgotPasswordData,$scope);
    }
})