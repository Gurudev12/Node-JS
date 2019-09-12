chatApp.service('getUserDetailService', function ($http, $location) {
    console.log("i m in chat service")
    this.getUserDetailServiceUser = function ($scope){
        $http(
            {
                method:'GET',
                url:'http://localhost:4000/userData'

            }).then(
                     function (response)
                     {                    
                        console.log(response.data)
                        $scope.getUserData=response.data
                        console.log($scope.getUserData)
                    })

              .catch( function (error)  {

                    console.log("Nothing is present")
                });
    }
});
