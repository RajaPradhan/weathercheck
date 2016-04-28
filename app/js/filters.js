// Custom filter to convert UNIX timestamp to local timestamp

angular.module('WeatherCheckApp')
.filter('unixToLocalTime', function() {
	return function(unixTimestamp) {
		return WEATHERCHECKAPP.UTILS.convertTimestampFromUnixToLocal(unixTimestamp);
	};
})

.filter('celsiusToFahrenheit', function() {
	return function(tempInCelsius) {
		return tempInCelsius * 9/5 + 32;
	}
})

.filter('roundTo', function() {
	// It only rounds floating point numbers
	return function(number, decimals) {
		return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
	};
});