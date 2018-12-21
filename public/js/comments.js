// comments.js

let $commentInput = $(".add-comment");
let $commentDelete = $(".delete-comment");
let $articlesScrap = $("div#nav-scrape-huff")
let $articlesDelete = $("div#nav-delete-articles");

console.log("$articlesScrap ------------> ", $articlesScrap);

// The API object contains methods for each kind of request we'll make
var API = {
    scrapeArticles: function() {
        console.log("running function, scrapeArticles <<<<<<>>>>>>>>>>");
        $.ajax("/api/huffScrape", {
        type: "GET"
      }).then( function() {
          console.log("scrape new articles");
          location.reload();
      });
    },
    createComment: function(commentData) {
        console.log("running function, createComments <<<<<<>>>>>>>>>>");
        $.ajax("/api/comment", {
        type: "POST",
        data: commentData
      }).then( function() {
          console.log("create new comment");
          location.reload();
      });
    },
    deleteComment: function(commentData) {
        return $.ajax({
          url: "/api/comment",
          type: "DELETE",
          data: commentData
          
        }).then(function() {
            console.log("Deleted Comment: ", commentData.commentId);
            location.reload();
        });
      },
      deleteArticles: function() {
        return $.ajax({
          url: "/api/articles/",
          type: "DELETE"
        });
      }
  };

var handleDeleteCommentsBtnClick = function(event) {
    event.preventDefault();
    console.log("Starting handleDeleteCommentsBtnClick");
    let commentData = {
        commentId : $(this).attr("data-id"),
        articleId : $("#article-title").attr("data-id")
    }

    console.log("===+++++++++++++++++++++++> commentData: ", commentData);
    API.deleteComment(commentData);

}

var handleAddCommentBtnClick = function(event) {
    event.preventDefault();
    console.log("starting handleAddCommentBtnClick");
    // let articleId = $(this)
    //     .parent()
    //     .attr("data-id");
    let author = $("#formGroupAuthor").val();
    let comment = $("#formGroupComment").val();
    let articleId = $("#article-title").attr("data-id");
    
    if (author && comment) {
        let commentData = {
            author: author,
            comment: comment,
            articleId: articleId
        };
        console.log("===+++++++++++++++++++++++> commentData: ", commentData);
        // ToDo:  create the call to the comments html route
        API.createComment(commentData);
    } else {
        alert("Comment or Auther cannot be blank");
    }

    
}

// $(".add-comment").on("click", function(event) {
//     event.preventDefault();
//     console.log("============> click on add-comment <================");
//     let author = $("#formGroupAuthor").val();
//     let comment = $("#formGroupComment").val();
//     let articleId = $("#article-title").attr("data-id");
//     let commentData = {
//         author: author,
//         comment: comment,
//         articleId: articleId
//     };

//     console.log("===> commentData: ", commentData);
//     // ToDo:  create the call to the comments html route

//     API.createComment(commentData);
// });

console.log("$articleDelete: =============  ========> ", $articlesDelete);

var handleDeleteArticlesBtnClick = function(event) {
    event.preventDefault();
    console.log("starting fn() handleDeleteArticlesBtnClick {{{{{{{{{{{");
    // alert("hello!");
    if (confirm('Are you sure you want to save this thing into the database?')) {
        // Delete all Articles!
        API.deleteArticles();
    } else {
        // Do nothing!
    }
}

var handleScrapeArticleBtnClick = function() {
    console.log("scaping new articles in handleScrapeArticleBtnClick");
    API.scrapeArticles();
}

$commentInput.on("click", handleAddCommentBtnClick);
$commentDelete.on("click", handleDeleteCommentsBtnClick);
$articlesDelete.on("click", handleDeleteArticlesBtnClick);
$articlesScrap.on("click", handleScrapeArticleBtnClick);

// $(".delete-articles").on("click", function(event) {
//     event.preventDefault();
//     console.log("++++++++==============> Clicked the delete Article function");
//     alert("hello world!");
//   });

