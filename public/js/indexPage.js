// index.js

let $commentsList = $("#article-list");
let $articlesDelete = $("div#nav-delete-articles");
let $articlesScrap = $("li div#nav-scrape-huff");
let $deleteArticles = $("button#delete-articles");


console.log("$articlesDelete: ======> :", $articlesDelete);
console.log("$deleteArticles: ======> :", $deleteArticles);

// The API object contains methods for each kind of request we'll make
var API = {
  scrapeArticles: function() {
    console.log("running function, scrapeArticles <<<<<<>>>>>>>>>>");
    $.ajax("/api/huffScrape", {
      type: "GET"
    }).then(function() {
      console.log("scrape new articles");
      location.reload();
    });
  },
  getComments: function(id) {
    console.log("Get comments <<<< id == ", id);
    return $.ajax({
      url: "comments/" + id,
      type: "GET"
    });
  },
  deleteArticles: function() {
      console.log("+++++++++++++++==============+++++++++++++++> delete Articles")
      return $.ajax({
      url: "/api/articles/",
      type: "DELETE"
    }).then(function() {
      console.log("scrape new articles");
      location.reload();
    });
  }
};

var handleScrapeArticleBtnClick = function() {
  console.log("scaping new articles in handleScrapeArticleBtnClick");
  API.scrapeArticles();
};

var handleListCommentsBtnClick = function() {
  let articleId = $(this)
    .parent()
    .attr("data-id");
  console.log("===> handleList - articleId: ", articleId);
  // ToDo:  create the call to the comments html route
  API.getComments(articleId);
};

console.log("$articleDelete: =============  ========> ", $articlesDelete);

// Fn() to handle deleting all Articles
var handleDeleteArticlesBtnClick = function(event) {
  event.preventDefault();
  console.log("starting fn() handleDeleteArticlesBtnClick {{{{{{{{{{{");
  // alert("hello!");
  if (confirm("Are you sure you want to save this thing into the database?")) {
    // Delete all Articles!
    API.deleteArticles();
  } else {
    // Do nothing!
  }
};

$commentsList.on("click", handleListCommentsBtnClick);
$articlesDelete.on("click", handleDeleteArticlesBtnClick);
$deleteArticles.on("click", handleDeleteArticlesBtnClick);
$articlesScrap.on("click", handleScrapeArticleBtnClick);
