chatApp.service("registrationService", function($http, $location) {

  


    this.registerServicesUser =  function (data, $scope){
        console.log("in to registration service .....");
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/Registration',
                data: data
            }).then(
                function (response)  {
                    if(response.data.data==="Registration successfully")
                    {
                        alert("Register succesfull");
                        $location.path('/welcome')
                    }
                    else if(response.data.data==="Registration not done")
                    {
                        alert('Registration failed');
                        
                    }
                    else if(response.data.data==="Sorry..Already register")
                    {
                        alert("Registration already done");
                    }
                    else if(response.data.error)
                    {
                        alert(response.data.error[0].msg);
                    }

                }).catch( function (error)  {

                    $scope.register = function () {
                        alert("Registration failed...")
                        console.log("Registration failed..", error)
                    }
                  
                });
    }
});