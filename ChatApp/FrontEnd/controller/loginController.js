chatApp.controller('loginCtrl',function($scope,loginService){

    this.emailValidation=function(email)
    {
        alert(email);
    }
     
    $scope.login=function(){
        let loginData={
            'email':$scope.email,
            'password':$scope.password
        }
        loginService.loginServicesUser(loginData,$scope);
       
    }    
    $scope.loginName= localStorage.getItem('firstname')
})
