'use strict';

angular.module('WeatherCheckApp')
// Custom directive to handle Enter key press in search box
.directive('enterKeypress', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('keyup', function(event) {
				var keyCode = event.which || event.keyCode;
				if(keyCode === 13) {
					scope.$apply(function() {
						scope.$eval(attrs.enterKeypress);
					});
				}
			});
		}
	};
})

// Custom directive for current weather tile component
.directive('currentWeatherTile', function() {
	return {
		restrict: 'E',
		scope: {
			currentWeatherData: '='			
		},
		templateUrl: 'tpls/currentweathertile.tpl.html'
	};
})

// Custom directive for current weather additional info table component
.directive('currentWeatherInfo', function() {
	return {
		restrict: 'E',
		scope: {
			currentWeatherAdditionalInfo: '='
		},
		templateUrl: 'tpls/currentweatherinfo.tpl.html'
	};
})

// Custom directive to draw weather forecast chart
.directive('dailyForecastChartType', function() {
	return {
		restrict: 'A',
		scope: {
			dailyForecastData: '='
		},
		
		link: function(scope, element, attrs) {
			var dataListLength,
				dailyForecastData,
				morningTemperatures = [],
				dayTemperatures = [],
				eveningTemperatures = [],
				nightTemperatures = [],
				dates = [],
				temperatureChart,
				wholedayChart,
				chartType = attrs['daily-forecast-chart-type'],
				
			drawDailyForecastChart = function() {
				temperatureChart = new Highcharts.Chart({
					chart: {
						renderTo: 'dailyWeatherForecastChart'
					},
					
					title: {
						text: 'Next 10 days weather forecast'
					},
					
					plotOptions: {
						line: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true
							}
						}
					},
					
					xAxis: {
						categories: dates
					},
					
					yAxis: {
						title: {
							text: 'Temperature (°C)'
						}
					},
					
					series: [{
						type: 'line',
						name: 'Average temperature',
						data: dayTemperatures
					}]
				});
			},
			
			drawWholedayTempChart = function() {	
				wholedayChart = new Highcharts.Chart({
					chart: {
						renderTo: 'wholedayTemperature'
					},
					
					title: {
						text: 'Next 10 days daily drilldown'
					},
					
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					
					xAxis: {
						categories: dates
					},
					
					yAxis: {
						title: {
							text: 'Temperature (°C)'
						}
					},
					
					series: [{
						type: 'column',
						name: 'Morning',
						data: morningTemperatures
					},
					{
						type: 'column',
						name: 'Day',
						data: dayTemperatures
					},
					{
						type: 'column',
						name: 'Evening',
						data: eveningTemperatures
					},
					{
						type: 'column',
						name: 'Night',
						data: nightTemperatures
					}]
				});
				
			
			};
					
			scope.$watch(function() {
				return scope.dailyForecastData;
			}, function(newValue) {
				if(newValue) {
					morningTemperatures = [],
					dayTemperatures = [],
					eveningTemperatures = [],
					nightTemperatures = [],
					dates = [];
					
					dataListLength = scope.dailyForecastData.list.length;
					dailyForecastData = scope.dailyForecastData;
					
					for(var i=0; i < dataListLength; i++) {
						var thisTemp = dailyForecastData.list[i].temp;
						dates.push(dailyForecastData.list[i].dt);
						morningTemperatures.push(thisTemp.morn);
						dayTemperatures.push(thisTemp.day);
						eveningTemperatures.push(thisTemp.eve);
						nightTemperatures.push(thisTemp.night);
					}
					
					dates = dates.map(function(timestamp) {
						return WEATHERCHECKAPP.UTILS.getDateWithoutTime(timestamp);
					});
					
					if(chartType === 'dailyForecastChart' && dayTemperatures.length > 0) {
						temperatureChart.series[0].setData(dayTemperatures, true);
					} else {
						drawDailyForecastChart();
					}
					
					if(chartType === 'wholedayTempChart'
						&& morningTemperatures.length > 0
						&& dayTemperatures.length > 0
						&& eveningTemperatures.length > 0
						&& nightTemperatures.length > 0
					) {
						wholedayChart.series[0].setData(morningTemperatures, true);
						wholedayChart.series[1].setData(dayTemperatures, true);
						wholedayChart.series[2].setData(eveningTemperatures, true);
						wholedayChart.series[3].setData(nightTemperatures, true);
					} else {
						drawWholedayTempChart();
					}
				}
			});
			
		}
		
	};
});