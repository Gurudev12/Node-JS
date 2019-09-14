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
                        console.log(response.data.data)
//'token,firstname,loginId' is key value set to local storage and 'response.data.data.name' getting from db.
                        localStorage.setItem('token',response.data.data.token) 
                        localStorage.setItem('firstname',response.data.data.name) 
                        localStorage.setItem('loginId',response.data.data.userId)

//'firstname,userId' is keyvalue gettting from localstorage and save it to another variable
                       $scope.loginId=localStorage.getItem('loginId')
                       $scope.loginName= localStorage.getItem('firstname') 
                       console.log("login service")
                        console.log($scope.loginId)
                        console.log($scope.loginName)
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