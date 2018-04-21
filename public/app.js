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
				return $http.get('/allusers').then(function(d){
					return d.data;
				});
			},
			find : function(data){
				return $http.get('/userbyid/'+data.id).then(function(d){
					$scope.user = d.data;
					return true;
				});
			},
			add : function(data){
				return $http.post('/userpost',data).then(function(d){
					return true;
				});

			},
			update : function(data){
				return $http.put('/userput',data).then(function(d){
					return true;
				});
			},
			remove : function(id){
				return $http.delete('/delete/user/'+id).then(function(){
					return true;
				});
			}
		};

		if(parseInt($location.$$absUrl.split('user/')[1])){
			user.find({ id: parseInt($location.$$absUrl.split('user/')[1]) });
		}

	    function loadUsers(){ 
	    	user.findAll().then(function (d){
	    		$scope.users = d;
	    	});
		}

	    $scope.create = function (d) {
	        user.add(d).then(function(data){
			window.location.href='/users';
		});
	    }

	    $scope.edit = function (d) {
	        user.update(d).then(function(data){
			window.location.href = '/users';
		});
	    }

	    $scope.delete = function () {
		    return user.remove({ id: $scope.id }).then(function(data){
		    	window.location.href = '/users';
		    });
	    }

	    loadUsers();
	}]);

})();
