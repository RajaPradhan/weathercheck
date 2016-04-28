'use strict';

angular.module('WeatherCheckApp')
// Handles current weather data fetch
.controller('CurrentWeatherCtrl', ['$scope', 'currentWeatherFetchService', 'dailyWeatherForecastFetchService', 
	function($scope, 
	currentWeatherFetchService,
	dailyWeatherForecastFetchService) {
		$scope.city = 'Bangalore';
		
		var fetchCurrentWeather = function() {
			currentWeatherFetchService.fetchCurrentWeatherDataFromAPI($scope.city)
			.success(function(responseData) {
				currentWeatherFetchService.setCurrentWeatherData(responseData);
			})
			.error(function(error) {
				console.log('Error in fetching current weather data => ', error);
				// Retry after 3 secs
				setTimeout(function() {
					//fetchCurrentWeather();
				}, 3000);
			});
		},
		
		fetchDailyForecastData = function() {
			dailyWeatherForecastFetchService.fetchDailyWeatherForecastData($scope.city)
			.success(function(responseData) {
				dailyWeatherForecastFetchService.setDailyWeatherForecastData(responseData);
			})
			.error(function(error) {
				console.log('Error in fetching daily weather forecast data => ', error);
				// Retry after 3 secs
				setTimeout(function() {
					//fetchDailyForecastData();
				}, 3000);
			});
		};
		
		$scope.fetchWeatherData = function() {
			fetchCurrentWeather();
			fetchDailyForecastData();
		};
		
		// Load data when the page is initially loaded or when the page is refreshed
		$scope.fetchWeatherData();
}])

// Prepares scope object for rendering current weather in currentWeatherTile and currentWeatherInfoTable
// The approach used here is sharing data between controllers through a service
.controller('CurrentWeatherRenderCtrl', ['$scope', 'currentWeatherFetchService', function($scope, currentWeatherFetchService) {
	$scope.$watch(function() {
		return currentWeatherFetchService.getCurrentWeatherData();
	}, function(newValue) {
		$scope.currentWeather = newValue;
	});
}])

.controller('DailyWeatherForecastRenderCtrl', ['$scope', 'dailyWeatherForecastFetchService', function($scope, dailyWeatherForecastFetchService) {
	$scope.$watch(function() {
		return dailyWeatherForecastFetchService.getDailyWeatherForecastData();
	}, function(newValue) {
		$scope.dailyWeatherForecastData = newValue;
	});
}]);