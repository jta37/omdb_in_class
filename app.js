// We need to require any libraries we want to use.
var express = require("express");
var request = require("request");

// Express requires that we instantiate an app.
var app = express();

// Create a handler to respond to GET requests
// to our home page ("/").
app.get('/', function(req, res){
  res.render('index.ejs');
});



// Create a handler to respond to GET requests
// to our search page ("/search").
app.get("/search", function(req, res) {

	// Grab the movie title from the URL query string
	var searchTerm = req.query.movieTitle;

	// Build the URL that we're going to call
	 var url = "http://www.omdbapi.com/?s=" + searchTerm;

	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			var obj = JSON.parse(body);

			//Capital 'S' in obj.Search is the key of the object returned
			//in the JSON query
			res.render("results.ejs", {movieList: obj.Search});			
		}
	});

});

app.listen(3000);


