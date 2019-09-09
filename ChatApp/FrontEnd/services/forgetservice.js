chatApp.service("forgetPasswordService", function ($http, $location) {
    this.forgetPasswordServicesUser =  function (data, $scope){
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/ForgetPassword',
                data: data
            }).then(
                     function (response)  {
                    console.log("done successfully");
                    console.log(response);

                    $scope.forgetPassword = function ()  {
                        alert(" done Successfully...")
                    }

                    /** this will go on login after completing registration successful */
                    $location.path('/login');

                }).catch( function (error)  {

                    $scope.forgetPassword = function () {
                        alert("forget password  failed...")
                    }
                    console.log("forget password failed..", error)
                });
    }
});