// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.
var logger = require("morgan");
  // Dependencies
  var express = require("express");
  var exphbs = require("express-handlebars");
  // var mongojs = require("mongojs");

  // Require axios and cheerio. This makes the scraping possible
  // var axios = require("axios");
  // var cheerio = require("cheerio");
  var mongoose = require("mongoose");
  // Require all models
  var db = require("./models");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var PORT = process.env.PORT || 3000;

  // Initialize Express
  var app = express();
  
// Use morgan logger for logging requests
  app.use(logger("dev"));
  // Parse request body as JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // Static directory
  app.use(express.static("public"));

  // Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

  // Database configuration
  var databaseUrl = "mongoHeadlines";
  var collections = ["scrapeNews"];

  // Hook mongojs configuration to the db variable
  // var db = mongojs(databaseUrl, collections);
  // db.on("error", function (error) {
  //   console.log("Database Error:", error);
  // });

  // // Main route (simple Hello World Message)
  // app.get("/", function (req, res) {
  //   console.log("Root page:  Hello World");
  //   res.send("Hello world");
  // });

  // Routes
  require("./routes/apiRoutes")(app, db);
  require("./routes/htmlRoutes")(app, db);

  app.get("/indexOne", function(req, res){
    res.redirect("/index.html");
  })

  /* -/-/-/-/-/-/-/-/-/-/-/-/- */

  // Listen on port 3000 or whatever Heroku chooses
  app.listen(PORT, function () {
    console.log("App running on port 3000! http://localhost:3000");
  });

  module.exports = app;