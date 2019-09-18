chatApp.controller('registrationCtrl',function($scope,registrationService){

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
    
    $scope.registration=function(){
        let registrationData={
            'firstname':$scope.firstname,
            'lastname':$scope.lastname,
            'email':$scope.email,
            'password':$scope.password
        }
        registrationService.registerServicesUser(registrationData,$scope);
    }  
})