// index.js

$commentsList = $("#article-list");
$articlesDelete = $("#delete-articles");

// The API object contains methods for each kind of request we'll make
var API = {
    // saveComments: function(example) {
    //   return $.ajax({
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     type: "POST",
    //     url: "api/examples",
    //     data: JSON.stringify(example)
    //   });
    // },
    // get all comments related to one article
    getComments: function(id) {
        console.log("Get comments <<<< id == ", id);
        return $.ajax({
            url: "comments/" + id,
            type: "GET"
        });
    },
    deleteArticles: function(id) {
      return $.ajax({
        url: "/api/articles/",
        type: "DELETE"
      });
    }
  };

var handleListCommentsBtnClick = function() {
    let articleId = $(this)
        .parent()
        .attr("data-id");
    console.log("===> handleList - articleId: ", articleId);
    // ToDo:  create the call to the comments html route
    API.getComments(articleId);
    
}

// Fn() to handle deleting all Articles
var handleDeleteArticlesBtnClick = function(event) {
  event.preventDefault();
  console.log("starting fn() handleListCommentsBtnClick {{{{{{{{{{{");
  API.deleteArticles(articleId);
  
}

$commentsList.on("click", ".comments", handleListCommentsBtnClick);
// $articlesDelete.on("click", ".articles", handleDeleteArticlesBtnClick);

// $("#delete-articles").on("click", function(event) {
//   event.preventDefault();
//   console.log("++++++++==============> Clicked the delete Article function");
// });

// $(".change-devoured").on("click", function (event) {
//   var id = $(this).data("id");
//   console.log("id: ", id);
//   var isDevoured = $(this).data("newstate");
//   console.log("isDevoured: ", isDevoured);
//   var newState = {
//     devoured: isDevoured
//   };

//   // Send the PUT request.  It's an update call
//   $.ajax("/api/burgers/" + id, {
//     type: "PUT",
//     data: newState
//   }).then(
//     function () {
//       console.log("changed devoured to", newState);
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });