angular.module('booksApp', [])
    .controller('AppController', function ($scope, $http) {
        console.log(" from controller")
        var currentId = 1;

        var bring = function() {
            $http.get('/books').then(function(response){
            console.log("I got the data I requested")
            $scope.books = response.data;
        })
    }
    bring();

    $scope.createProduct = function(){
        
        $scope.product.id = currentId;
        $http.post("/books", $scope.product).then(function(response){
            console.log(response)
            currentId++;
            bring();
        })
    }

    $scope.remove = function(id){
        console.log(id);
        $http.delete("/books/"+id).then(function(response){
            currentId--;
            bring();
        });
    }

    $scope.updateProduct = function(id){
        console.log(id );
       
        $scope.product = $scope.books.find(product => product._id === id)
        $http.put("/books/"+$scope.product._id, $scope.product).then(function(response){
            bring();
        })
          
        
    }


    })