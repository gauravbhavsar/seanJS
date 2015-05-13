(function(){
	'use strict';

	var app = angular.module('app',['userApp']);

	app.directive('layoutPage',function(){
		return {
			restrict:'E',
			templateUrl:'/common/layout-page.html'
		};
	}]);
})();