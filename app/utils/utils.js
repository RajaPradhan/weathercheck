// Utility Methods

var WEATHERCHECKAPP = WEATHERCHECKAPP || {};
WEATHERCHECKAPP.UTILS = (function() {
	var convertTimestampFromUnixToLocal = function(timestamp) {
		var monthMap = {
			"01": "Jan",
			"02": "Feb",
			"03": "Mar",
			"04": "Apr",
			"05": "May",
			"06": "Jun",
			"07": "Jul",
			"08": "Aug",
			"09": "Sep",
			"10": "Oct",
			"11": "Nov",
			"12": "Dec"
		},
			d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
			yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
			Mon = monthMap[mm],
			dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
			hh = d.getHours(),
			h = hh,
			min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
			ampm = 'AM',
			time;
				
		if (hh > 12) {
			h = hh - 12;
			ampm = 'PM';
		} else if (hh === 12) {
			h = 12;
			ampm = 'PM';
		} else if (hh == 0) {
			h = 12;
		}
	
		// ie: 11 Apr 2016, 8:35 AM	
		time = dd + ' ' + Mon + ' ' + yyyy + ', ' + h + ':' + min + ' ' + ampm;;
		return time;
	},
	
	getDateWithoutTime = function(timestamp) {
		var time = this.convertTimestampFromUnixToLocal(timestamp);
		return time.substring(0, time.indexOf(','));
	};
	
	return {
		convertTimestampFromUnixToLocal: convertTimestampFromUnixToLocal,
		getDateWithoutTime: getDateWithoutTime
	};
})();