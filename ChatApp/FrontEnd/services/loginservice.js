chatApp.service("loginService", function ($http, $location) {
    
    this.loginServicesUser =  function (data, $scope){
        $http(
            {
                method:'POST',
                url:'http://localhost:4000/Login',
                data: data
            }).then(
                     function (response)
                     {                    
                        console.log(response.data)
                        localStorage.setItem('token',response.data.data.token)
                        $location.path('/chat')
                    })

              .catch( function (error)  {

                    $scope.login = function () {
                        alert("login failed...")
                    }
                    console.log("login failed..", error)
                });
    }
});