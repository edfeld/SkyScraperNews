var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function (app, db) {
    // console.log("db: ", db);
    // TODO: make routes
    var API = {
        getHuff: function () {
            // return axios.get("https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1311.R1.TR12.TRC2.A0.H1.Xchain.TRS0&_nkw=chainsaw&_sacat=0"
            return axios.get("https://www.huffingtonpost.com/");
        }
    };
    // Route 1
    // =======
    // This route will retrieve all of the data
    // from the scrapedData collection as a json (this will be populated
    // by the data you scrape using the next route)
    // An empty array to save the data that we'll scrape
    var results = [];

    app.get("/api/huffScrape", function (req, res) {
        // 
        // axios.get("https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1311.R1.TR12.TRC2.A0.H1.Xchain.TRS0&_nkw=chainsaw&_sacat=0")
        API.getHuff()
            .then(function (response) {

                // Load the HTML into cheerio and save it to a variable
                // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
                var $ = cheerio.load(response.data);
                var intCount = 0;
                $(".card__headlines").each(function (i, element) {
                    intCount++
                    // console.log(element);
                    var link = "https://www.huffingtonpost.com" + $(element).children(".card__headline").children("a.card__link").attr("href");
                    // console.log(link);
                    var title = $(element).children(".card__headline").children("a.card__link").text();
                    // console.log("$(element.children().text():", $(element).children().text());
                    var summary = $(element).children(".card__description").children("a.card__link").text();
                    if (summary) {
                        summary = summary.trim();
                        // console.log("summary Trim: ", summary);
                    }
                    results.push({
                        title: title.trim(),
                        summary: summary,
                        link: link
                    });
                });
                console.log("count: ", intCount);
                // res.json(results);
                let arrNewHeadLines = [];
                results.forEach(function (element) {
                    db.Article.create(element).then(function (newElement) {
                            arrNewHeadLines.push(newElement);
                            // console.log("newElelment=====>>>>>>>>, ", newElement);
                            // res.json(newElement);
                        })
                        .catch(function (err) {
                            // If an error occurs, send it back to the client
                            console.log("=> The Error:: ", err);
                        });
                });
                // Without this delay, this display happens before the array gets load. 
                setTimeout(function () {
                    console.log("arrNewHeadLines: >>>>+++++++>>>>>>>: ", arrNewHeadLines);
                    res.json(arrNewHeadLines);
                }, 2000);

            });
    });

    // post route for saving a Comment to the db and associating it with an Article
    app.post("/api/comment", function (req, res) {
        console.log("=++==++==++==++==++==++==>>> req.body.articleId: ", req.body.articleId);
        // Create a new comment
        db.Comment.create({
                author: req.body.author,
                comment: req.body.comment
            })
            .then(function (dbComments) {
                // If a new Comment is created successfully, find one Article and push the new Comment's _id to the Article's `comments` array
                return db.Article.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(req.body.articleId)
                }, {
                    $push: {
                        comments: dbComments._id
                    }
                }, {
                    new: true
                });
            })
            .then(function (dbComments) {
                res.json(dbComments);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete('/api/comment', function (req, res) {
        var commentId = req.body.commentId;
        var articleId = req.body.articleId
        console.log("Delete CommentId: ", commentId);
        console.log("update ArticleId: ", articleId);

        db.Comment.deleteOne({
                _id: mongoose.Types.ObjectId(commentId)
            })
            .then(function (dbComments) {
                return db.Article.updateOne({
                    _id: mongoose.Types.ObjectId(articleId)
                }, {
                    $pull: {
                        comments: mongoose.Types.ObjectId(commentId)
                    }
                })
            })
            .then(function (dbComments) {
                console.log("//////////////// comment Removed!! \\\\\\\\\\\\\\\\");
                res.send('/');
                // res.status("Comment Removed!")
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // find and return 1 artice in json
    app.get("/article/:articleId", function (req, res) {
        // query for with the articleId
        // console.log("articleId: ", req.params.articleId)
        db.Article.find({
                _id: mongoose.Types.ObjectId(req.params.articleId)
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                // if an error occurs, send it back to the client
                res.json(err);
            });
    });

    // Delete all articles and all comments
    app.delete('/api/articles', function (req, res) {
        db.Article.deleteMany({})
            .then(function (dbArticles) {
                db.Comment.deleteMany({})
                    .then(function (dbArticles) {
                        console.log("All Comments Removed!!");
                        res.json(dbArticles);
                    })
                    .catch(function (err) {
                        res.status("error text: ", err);
                    })
            })
            .then(function (dbArticles) {
                console.log("All Article Removed!!");
                res.send('done');
                // res.status("Comment Removed!")
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}