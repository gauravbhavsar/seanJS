(function(){

	var app = angular.module('userApp',[]);

	app.controller('userController',['$scope','$http','$q',function($scope,$http,$q){
		var user = {
			findAll : function(){
				var defer = $q.defer();
				$http.get('/users').success(function(data){
					defer.resolve(data);
					console.log("data->",data);
				});
				return defer.promise;
			},
			find : function(id){
				$http.get('/user/'+id).success(function(data){

				});
			},
			add : function(data){
				$http.post('/userpost',data).success(function(){

				});

			},
			update : function(data){
				$http.put('/userput',data).success(function(){

				});
			},
			remove : function(id){
				$http.delete('/delete/user/'+id).success(function(){

				});
			}
		};

		$scope.detail = user.find({ id: $scope.id });

	    function loadUsers() { user.findAll().then(function (d) { 
	    	console.log("users record -> ",d);
	    	$scope.users = d; }); }

	    $scope.create = function () {
	        user.add({ name: $scope.name }).then(function (d) {
	            $scope.name = '';
	            loadUsers();
	        });
	    }

	    $scope.edit = function () {
	        return user.update({ name: $scope.name });
	    }

	    $scope.delete = function () {
	        return user.remove({ id: $scope.id });
	    }

	    loadUsers();
	}]);
});