var app = angular.module("AdventureApp");

app.service("OutingService", ["$http", function ($http) {

    this.getOutings = function () {
        return $http.get("/api/outing").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.saveOuting = function (outing) {
        return $http.post("/api/outing", outing).then(function (response) {
            
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.getProducts = function () {
        return $http.get('/api/user').then(function (response) {

            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
}]);

app.controller("OutingController", ["$scope", "$http", "OutingService", function ($scope, $http, OutingService) {

    $scope.outing = {};
    $scope.outings = [];
    $scope.gears = [];
    
   
    
    (function getProducts() {
        OutingService.getProducts().then(function (products) {
            
            $scope.products = products;
           
        });
    })();

    (function getOutings() {
        OutingService.getOutings().then(function (outings) {
            
            $scope.outings = outings;

        });
    })();

    
    $scope.outing.gear = [];
    

    $scope.saveOuting = function (outing, gears) {
    
        outing.gear = gears;
        
//        $scope.outings.push(outing);// get rid of this once I call the getOuting service below
//        
        OutingService.saveOuting(outing).then(function () {
          
            OutingService.getProducts().then(function (products) {
            
            $scope.products = products;
           
        });
            
          $scope.outing = {};  
          $scope.gears = []

        });
        
        (function getOutings() {
        OutingService.getOutings().then(function (outings) {
            
            $scope.outings = outings;

        });
    })();
       
    }
}]);
