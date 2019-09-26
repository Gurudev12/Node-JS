chatApp.service("resetService", function ($http, $location) {

    this.resetServicesUser =  function (data, $scope){
        $http(
            {
                method: 'POST',
                url: 'http://18.188.202.15:4000/ResetPassword',
                data: data
            })
            .then(
                    function (response)
                    {              
                        console.log("reset password service success")
                       console.log(response.data)
                   })

            .catch( function (error)  {

                    $scope.resetPassword = function () {
                        alert("Reset password  failed...")
                    }
                    console.log("reset password error in service", error)
                });
    }
});