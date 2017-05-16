var app = angular.module("AdventureApp.Auth");

app.controller("LogoutController", ["UserService", function (UserService) {  
    UserService.logout();
}]);