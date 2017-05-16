var app = angular.module("AdventureApp");

app.service("HomeService", ["$http", function ($http) {

    this.getAthletes = function (query) {
        return $http.get("/athletes"+ query).then(function (response) {
            console.log(response.data)
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

   

    this.getOutings = function (param) {
        return $http.get('/athletes/'+ param).then(function (response) {

            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    }
}]);

app.controller("homeController", ["$scope", "HomeService", function ($scope, HomeService) {
    

    $scope.seeAthletes = function (search) {
        
        var query = "/?name="
        query += search
        console.log(query)
        HomeService.getAthletes(query).then(function (response) {
               
                $scope.athletes = response;
                var athleteId = response[0]._id;
            HomeService.getOutings(athleteId).then(function (response){
            $scope.outings = response;
            console.log(response);   
        })
            
            })
        }
    
    $scope.seeOutings = function (athleteId){
        
        
    }
    
}]);
