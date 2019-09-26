     var chatApp=angular.module("chatApp",['ui.router','btford.socket-io']);

     chatApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
 

          $stateProvider

          .state('login',{
               url:'/login',
               templateUrl:'templates/login.html',
               controller:'loginCtrl'
          })

          .state('register',{
           
               url:'/Registration',
               templateUrl:'templates/register.html',
               controller:'registrationCtrl'
          })

          .state('forgetPassword',{
               url:'/ForgetPassword',
               templateUrl:'templates/forgetPassword.html',
               controller:'forgetPasswordCtrl'
          })

          .state('resetPassword',{
               url:'/resetPassword:token',
               templateUrl:'templates/resetPassword.html',
               controller:'resetCtrl'
          })

          .state('chat',{
               url:'/chat',
               templateUrl:'templates/chat.html',
               controller:'getUserDetailCtrl'     
          })
          $urlRouterProvider.otherwise('/login');
     }]);

       /*socket code************************************ */
       chatApp.service('SocketService',['socketFactory', function SocketService(socketFactory) {
          return socketFactory({
          ioSocket: io.connect('http://18.188.202.15:4000')
          });
          }]);