chatApp.service("forgetPasswordService",function ($http,$location) {
    
  

    this.forgetPasswordServicesUser =  function(data, $scope){
        console.log("in forget password service.... ");
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/ForgotPassword',
                data: data
            }).then(
                function (response)  {
                    if(response.data.data==="mail send sucessfully")
                    {
                        alert("mail send succesfull");
                    }
                    else if(response.data.data==="Mail not send")
                    {
                        alert('MAIL NOT SEND');
                        
                    }
                    else if(response.data.data==="email is invalid")
                    {
                        alert("EMAIL IS INVALID");
                    }
                    else if(response.data.error)
                    {
                        alert(response.data.error[0].msg);
                    }

                }).catch( function (error)  {

                    $scope.forgetPassword = function () {
                        alert("forget password  failed...")
                    }
                    console.log("forget password failed..", error)
                });
    }
});