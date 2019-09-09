chatApp.service("loginService", function ($http, $location) {
    this.loginServicesUser =  function (data, $scope){
        $http(
            {
                method:'POST',
                url:'http://localhost:3000/Login',
                data: data
            }).then(
                     function (response)  {
                    console.log("login successfully");
                    console.log(response);

                    $scope.login = function ()  {
                        alert("login done Successfully...")
                    }

                    /** this will go on login after completing registration successful */
                    $location.path('/login');

                }).catch( function (error)  {

                    $scope.login = function () {
                        alert("login failed...")
                    }
                    console.log("login failed..", error)
                });
    }
});