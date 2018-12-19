var db = require("../models");
var mongoose = require("mongoose");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //   console.log("======> *******  hitting Index.handlebars")
    db.Article.find({}).then(function(dbArticles) {
      res.render("index", {
        articles: dbArticles
      });
    });
  });

  // Load comments page and pass in an Article by id
  app.get("/comments/:id", function(req, res) {
    console.log("my Id: +++++++++", req.params.id); 
    db.Article.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        .populate("comments")
        .then(function(dbComments) {
        // res.json(dbComments);
        // console.log("{ commentsObj: dbComments }: ===>", { commentsObj: dbComments })
        console.log("{ commentsObj: dbComments[0]}:", { commentsObj: dbComments[0]})
      res.render("comments", { commentsObj: dbComments[0] });
    })
    .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};