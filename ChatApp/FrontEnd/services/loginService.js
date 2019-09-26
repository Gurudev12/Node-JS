chatApp.service("loginService", function ($http, $location) {
    
    this.loginServicesUser =  function (data, $scope){
        $http(
            {
                method:'POST',
                url:'http://18.188.202.15:4000/Login',
                data: data
            }).then(function (response)
                     {                    
                        console.log("==>new content data",response.data.content)
//'token,firstname,loginId' is key value set to local storage and 'response.data.content.data.name' getting from db.
                        localStorage.setItem('token',response.data.content.data.token) 
                        localStorage.setItem('firstname',response.data.content.data.name) 
                        localStorage.setItem('loginId',response.data.content.data.userId)

//'firstname,userId' is keyvalue gettting from localstorage and save it to another variable
                       $scope.loginId=localStorage.getItem('loginId')
                       $scope.loginName= localStorage.getItem('firstname') 
                       console.log("login service")
                        console.log("==>login id",$scope.loginId)
                        console.log("==>login name",$scope.loginName)
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