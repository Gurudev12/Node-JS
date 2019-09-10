chatApp.service("loginService", function ($http, $location) {
    
    this.loginServicesUser =  function (data, $scope){
        $http(
            {
                method:'POST',
                url:'http://localhost:3000/Login',
                data: data
            }).then(
                     function (response){
                        if(response.data.data==="password matches")
                        {
                            alert("login succesfull");
                            $location.path('/welcome')
                        }
                        else if(response.data.data==="password not matched")
                        {
                            alert('Login fialed');
                            
                        }
                        else if(response.data.data==="email not matched")
                        {
                            alert("invalid");
                        }
                        else if(response.data.error)
                        {
                            alert(response.data.error[0].msg);
                        }


                }).catch( function (error)  {

                    $scope.login = function () {
                        alert("login failed...")
                    }
                    console.log("login failed..", error)
                });
    }
});