'use strict';

angular.module('WeatherCheckApp')
// Service responsible for fetching current weather data of a city from OpenWeatherMap API
.factory('currentWeatherFetchService', ['$http', function($http) {
	var currentWeatherData,
	fetchCurrentWeatherDataFromAPI = function(city) {
		return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=a035a8e4c58592d87c1990d0c8eb0ed5');
		
		//return $http.get('data/currentWeather.json');
	},
	
	setCurrentWeatherData = function(currentWeather) {
		currentWeatherData = currentWeather;
	},
	
	getCurrentWeatherData = function() {
		return currentWeatherData;
	};
	
	return {
		fetchCurrentWeatherDataFromAPI: fetchCurrentWeatherDataFromAPI,
		getCurrentWeatherData: getCurrentWeatherData,
		setCurrentWeatherData: setCurrentWeatherData
	};
}])

// Service responsible for fetching next 10 days weather forecast data of a city from OpenWeatherMap API
.factory('dailyWeatherForecastFetchService', ['$http', function($http) {
	var dailyWeatherForecastData,
	fetchDailyWeatherForecastData = function(city) {
		return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=metric&cnt=10&appid=a035a8e4c58592d87c1990d0c8eb0ed5');
		
		//return $http.get('data/forecast.json');
	},
	
	setDailyWeatherForecastData = function(dailyForecastData) {
		dailyWeatherForecastData = dailyForecastData;
	},
	
	getDailyWeatherForecastData = function() {
		return dailyWeatherForecastData;
	};
	
	return {
		fetchDailyWeatherForecastData: fetchDailyWeatherForecastData,
		setDailyWeatherForecastData: setDailyWeatherForecastData,
		getDailyWeatherForecastData: getDailyWeatherForecastData
	};
}]);