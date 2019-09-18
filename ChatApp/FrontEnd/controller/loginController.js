chatApp.controller('loginCtrl',function($scope,loginService){

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
        
     
    $scope.login=function(){
        let loginData={
            'email':$scope.email,
            'password':$scope.password
        }
        loginService.loginServicesUser(loginData,$scope);
       
    }    
    $scope.loginName= localStorage.getItem('firstname')
})
