var app = angular.module("AdventureApp");

app.service("GearService", ["$http", function ($http) {


    this.saveProducts = function (gear) {
        return $http.post("/api/gear", gear).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);


        });

    };
    
    this.getProducts = function (){
        return $http.get('/api/user').then(function (response){
            
            return response.data;
        }, function (response) {
                alert("Error " + response.status + ": " + response.statusText);
            });
    }
    

   
}]);

app.controller("ProductController", ["$scope", "$http", "GearService", function ($scope, $http, GearService) {
    $scope.product = {};
    $scope.products = [];
    $scope.success = false;
    
    (function getProducts() {
        GearService.getProducts().then(function (products) {
            console.log(products);
            $scope.products = products;

        });
    })();

    $scope.saveProduct = function (gear) {
        $scope.addGear = gear.brand + " " + gear.model;
        
        GearService.saveProducts(gear);
        $scope.products.push(gear);
        $scope.success = true;
        $scope.gear = {};
    }


}]);


