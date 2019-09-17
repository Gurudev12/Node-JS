chatApp.controller('loginCtrl',function($scope,loginService){
    $scope.login=function(){
        let loginData={
            'email':$scope.email,
            'password':$scope.password
        }
        loginService.loginServicesUser(loginData,$scope);
    }    
})
