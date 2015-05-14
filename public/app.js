(function(){
	'use strict';

	var app = angular.module('app',[]);

	app.directive('layoutPage',function(){
		return {
			restrict:'E',
			templateUrl:'/common/layout-page.html'
		};
	});

	app.controller('userController',['$scope','$http','$q',function($scope,$http,$q){
		var user = {
			findAll : function(){
				var defer = $q.defer();
				$http.get('/userinfo').success(function(data){
					defer.resolve(data);
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

	    function loadUsers(){ 
	    	user.findAll().then(function (d){
	    		$scope.users = d;
	    	});
		}

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