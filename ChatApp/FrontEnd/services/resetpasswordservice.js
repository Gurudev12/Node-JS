chatApp.service("resetService", function ($http, $location) {
    this.resetServicesUser =  function (data, $scope){
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/ResetPassword',
                data: data
            }).then(
                     function (response)  {
                    console.log("Reset password  successfully");
                    console.log(response);

                    $scope.resetPassword = function ()  {
                        alert("Reset password  successfully")
                    }

                    /** this will go on login after completing registration successful */
                    $location.path('/login');

                }).catch( function (error)  {

                    $scope.resetPassword = function () {
                        alert("Reset password  failed...")
                    }
                    console.log("Reset password  failed..", error)
                });
    }
});