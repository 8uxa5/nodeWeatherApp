const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"https://api.darksky.net/forecast/531f8e51c424090350db6061fc9dda8a/" +
		encodeURIComponent(latitude) +
		"," +
		encodeURIComponent(longitude) +
		"?units=si";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to Weather Forecast service!", undefined);
		} else if (body.error) {
			callback("Unable to find location. Try another search TERM.", undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					" It is currently " +
					body.currently.temperature +
					" degrees out. There is a " +
					body.currently.precipProbability +
					" chance of rain.",
				"Now It is " + body.minutely.summary,
			);
		}
	});
};

module.exports = forecast;
