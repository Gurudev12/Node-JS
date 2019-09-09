     var chatApp=angular.module("chatApp",['ui.router']);

     chatApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
 

          $stateProvider

          .state('login',{
               url:'/login',
               templateUrl:'templates/login.html',
               controller:'loginCtrl'
          })

          .state('register',{
           
               url:'/register',
               templateUrl:'templates/register.html',
               controller:'registrationCtrl'
          })

          .state('forgetPassword',{
               url:'/forgetPassword',
               templateUrl:'templates/forgetpassword.html',
               controller:'forgetPasswordCtrl'
          })

          .state('resetPassword',{
               url:'/resetPassword',
               templateUrl:'templates/resetpassword.html',
               controller:'resetCtrl'
          })
          $urlRouterProvider.otherwise('/login');
     }]);