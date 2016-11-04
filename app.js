var app = angular.module("MyApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/home.html",
        controller: "HomeController"
    }) .when("/data", {
        templateUrl: "templates/data.html",
        controller: "DataController"
    })
})



app.controller("HomeController", ["$scope", "$http", function($scope, $http) {
    $scope.data = [];
    $scope.search = "";
    $scope.comment = "";
    $scope.activeActor = {};
    $scope.changeActiveActor = function(index) {
        $scope.activeActor = index;
    }
     
    $scope.postComment = function(index, comment) {
        if(!$scope.data[index].comments){
            $scope.data[index].comments = [];
        }
        $scope.data[index].comments.push(comment);
        $scope.data[index].activity_comments++;
        $scope.data[index].comment = "";
        
    }
    
    $scope.removeComment = function(actorId, index) {
        for(var i = 0; i < $scope.data.length; i++) {
            if(actorId == $scope.data[i].id) {
                $scope.data[i].comments.splice(index, 1);
            }
        }
        $scope.data[index].activity_comments--;
        
    
    }
    
    $scope.countUp = function(index) {
        $scope.data[index].activity_likes++;
        
    }
    
    $scope.countDown = function(index) {
        $scope.data[index].activity_likes--;
    }
    
    $http.get("https://nuvi-challenge.herokuapp.com/activities").then(function(response) {
        $scope.data = response.data;
        console.log($scope.data);

    })
}])










app.controller("DataController", ["$scope", "$http", function($scope, $http) {
    $scope.message = "Data";
    
    $scope.search = "";
    $scope.providerData = [];
    $http.get("https://nuvi-challenge.herokuapp.com/activities").then(function(response) {
        $scope.providerData = response.data;
        console.log($scope.providerData);
        
    })
}])