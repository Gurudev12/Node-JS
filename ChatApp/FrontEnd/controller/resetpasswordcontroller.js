chatApp.controller('resetCtrl',function($scope,$stateParams,resetService){

    console.log("")
    
    $scope.resetPassword=function(){
        let resetPasswordData={
            'password':$scope.password,
            'token':$stateParams.token
        }
        resetService.resetServicesUser(resetPasswordData,$scope);
    }
})