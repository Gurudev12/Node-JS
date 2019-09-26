chatApp.service("registrationService", function($http, $location) {

    this.registerServicesUser =  function (data, $scope){
        $http(
            {
                method: 'POST',
                url: 'http://18.188.202.15:4000/Registration',
                data: data
            }).then(
                function (response)  {
                    if(response.data.success===true)
                    {
                        alert("Register succesfull");
                        $location.path('/welcome')
                    }
                    else if(response.data.success===false)
                    {
                        alert('Allready registration done'); 
                    }

                }).catch( function (error)  {

                    $scope.register = function () {
                        alert("Registration failed...")
                        console.log("Registration failed..", error)
                    }
                  
                });
    }
});