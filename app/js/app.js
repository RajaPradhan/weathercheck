'use strict';

angular.module('WeatherCheckApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'index.html',
		controller: 'CurrentWeatherCtrl'
	})
	.otherwise({redirectTo: '/'});
}]);