(function(){
	'use strict';

	var app = angular.module('app',['ui.router']);

	app.directive('layoutPage',function(){
		return {
			restrict:'E',
			templateUrl:'/common/layout-page.html'
		};
	});

	app.controller('userController',['$scope','$http','$q','$stateParams','$location',function($scope,$http,$q,$stateParams,$location){
		var user = {
			findAll : function(){
				var defer = $q.defer();
				$http.get('/allusers').success(function(d){
					defer.resolve(d);
				});
				return defer.promise;
			},
			find : function(data){
				$http.get('/userbyid/'+data.id).success(function(d){
					$scope.user = d;
				});
			},
			add : function(data){
				$http.post('/userpost',data).success(function(){
					window.location.href='/users';
				});

			},
			update : function(data){
				$http.put('/userput',data).success(function(){
					window.location.href = '/users';
				});
			},
			remove : function(id){
				$http.delete('/delete/user/'+id).success(function(){
					window.location.href = '/users';
				});
			}
		};

		user.find({ id: parseInt($location.$$absUrl.split('user/')[1]) });

	    function loadUsers(){ 
	    	user.findAll().then(function (d){
	    		$scope.users = d;
	    	});
		}

	    $scope.create = function (d) {
	        return user.add(d);
	    }

	    $scope.edit = function (d) {
	        return user.update(d);
	    }

	    $scope.delete = function () {
	        return user.remove({ id: $scope.id });
	    }

	    loadUsers();
	}]);

})();