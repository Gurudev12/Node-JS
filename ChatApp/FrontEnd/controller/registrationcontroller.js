chatApp.controller('registrationCtrl',function($scope,registrationService){


    $scope.registration=function(){
        let registrationData={
            'firstName':$scope.firstName,
            'lastName':$scope.lastName,
            'email':$scope.email,
            'password':$scope.password
        }
        registrationService.registerServicesUser(registrationData);
    }  
})