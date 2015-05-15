(function(){
	'use strict';

	var app = angular.module('app',['ui.router']);

	app.directive('layoutPage',function(){
		return {
			restrict:'E',
			templateUrl:'/common/layout-page.html'
		};
	});

	app.controller('userInfo',function(){
		angular.element(document).ready(function () {
        	$scope.detail = user.find({ id: $scope.id });
    	});
	})

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

				});
			}
		};

		// angular.element(document).ready(function () {
	 //        	return $scope.detail = user.find({ id: $state.id });
	 //    	});

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

	// app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
 //      $rootScope.$state = $state;
 //      $rootScope.$stateParams = $stateParams;
 //  	}]);

	// app.config(['$stateProvider','$urlRouteProvider',function($stateProvider,$urlRouteProvider){
	// 	$urlRouteProvider.otherwise('/users');
	// 	$stateProvider.state('app',{
	// 		'abstract':true,
	// 		url:'/users',
	// 		templateUrl:'/views/users.html'
	// 	});
	// }]);

	
})();