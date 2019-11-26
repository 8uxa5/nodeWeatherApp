const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define PATHS to Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// ROUTES Starts here
app.get("", (req, res) => {
	res.render("index", {
		title : "Weather App",
		name  : "Darius Maciunas",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title : "About Me",
		name  : "Darius Maciunas",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title    : "Help",
		helpText : "This is very helpful paragraph.",
		name     : "Darius Maciunas",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error : "Please, provide Address!",
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast : forecastData,
				location,
				address  : req.query.address,
			});
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("errorPage", {
		title     : "404",
		errorText : "Help Article not found!",
		name      : "Darius Maciunas",
	});
});

app.get("*", (req, res) => {
	res.render("errorPage", {
		title     : "404",
		errorText : "Page not found!",
		name      : "Darius Maciunas",
	});
});

app.listen(port, () => {
	console.log("Server is UP and Running on" + port);
});
