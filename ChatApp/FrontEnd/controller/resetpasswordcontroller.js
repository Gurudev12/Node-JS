chatApp.controller('resetCtrl',($scope,resetService)=>{

    console.log("reset is called");
    
    $scope.reset=function(){
        let resetPasswordData={
            'password':$scope.password
        }
    }
    
    console.log("reset data",registrationData);
    
    resetService.resetServicesUser(registrationData);
})