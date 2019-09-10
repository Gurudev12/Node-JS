chatApp.controller('registrationCtrl',function($scope,registrationService){

    console.log("in to registration controller .....");
    
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