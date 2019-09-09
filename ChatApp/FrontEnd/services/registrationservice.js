chatApp.service("registrationService", function($http, $location) {
    this.registerServicesUser =  function (data, $scope){
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/Registration',
                data: data
            }).then(
                     function (response)  {
                    console.log("registration successfully");
                    console.log(response);

                    $scope.register = function ()  {
                        alert("Registration done Successfully...")
                    }

                    /** this will go on login after completing registration successful */
                    $location.path('/login');

                }).catch( function (error)  {

                    $scope.register = function () {
                        alert("Registration failed...")
                    }
                    console.log("Registration failed..", error)
                });
    }
});