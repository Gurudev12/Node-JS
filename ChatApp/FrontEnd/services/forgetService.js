chatApp.service("forgetPasswordService",function ($http,$location) {
    
  

    this.forgetPasswordServicesUser =  function(data, $scope){
        
        $http({
                method: 'POST',
                url: 'http://18.188.202.15:4000/ForgotPassword',
                data: data
            })
        .then(function (response)  {
            console.log("i m in services")
                    console.log("forget passord success==>",response.data.success)
                    if(response.data.success===true)
                    {
                        alert("MAIL SEND SUCCESSFULLY");
                    }
                    else
                    {
                        alert("ERROR GENERATED WHILE RESET PASSWORD");
                        
                    }
            
                })
        .catch( function (error){
                    $scope.forgetPassword = function () {
                        alert("forget password  failed...")
                    }
                });
    }
});