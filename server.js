var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");


// mongoose connection for local or heroku
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/GoPackGo"

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// require html routes
require('./routes/htmlroutes')(app);

app.get("/", function(req, res) {
  res.render("index",{title:"Packers News Scraper"});
});

// Routes

// A GET route for scraping the Packers website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.packers.com/news/all-news").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("div.d3-l-col__col-3").each(function(i, element) {
        // Save an empty result object
        var result = {};
        var sitePrefix = "https://www.packers.com"
        // Add the title and href of every link, and save them as properties of the result object
        result.title = $(this)
            .find("a")
            .attr("title");
        result.link = sitePrefix + $(this)
            .find("a")
            .attr("href");

        var articleImage = $(this).find("a").find("figure").find("picture").find("source").attr("srcset").split(",")[0].split(" ")[0]
        articleImage = articleImage.replace("/t_lazy","")

        result.image = articleImage

        var articleSummary = $(this).find("div.d3-o-media-object__summary").find("p").text()
        result.summary = articleSummary

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
            .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
        })
            .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
        });
    });

    // Send a message to the client
    res.send("Pack Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/clearArticles", function(req, res){
  console.log("clearing articles")
  db.Article.deleteMany({}).then(
    function (err) {
    if (err) return err;
    // deleted at most one tank document
  });
  res.send("All Articles Cleared");
})

// Start the server
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
