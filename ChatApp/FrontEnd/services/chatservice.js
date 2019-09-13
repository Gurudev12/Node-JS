chatApp.service('getUserDetailService', function ($http, $location) {
   
    this.getUserDetailServiceUser = function ($scope){
        $http(
            {
                method:'GET',
                url:'http://localhost:4000/userData'

            }).then(function (response)
                     {                    
                      
                        $scope.getUserData=response.data //this is actual getUserData in chat.html
                        console.log($scope.getUserData)
                    })

              .catch(function(error){

                    console.log("Nothing is present")
                });
    }

    /*get message service************* */
    this.getUserMessageServiceUser=function($scope){
        $http(
            {
                method:'GET',
                url:'http://localhost:4000/messageChatAppData'

            }).then(function(response)
                     {                    
                        
                   $scope.message=response.data
                        console.log($scope.message)
                
                    })

              .catch(function(error){

                    console.log("Nothing is present")
                });
    }
    /*get message service************* */
});


