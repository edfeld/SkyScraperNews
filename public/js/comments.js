// comments.js

let $commentInput = $(".add-comment");
let $commentDelete = $(".delete-comment");

// The API object contains methods for each kind of request we'll make
var API = {
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
    let commentData = {
        author: author,
        comment: comment,
        articleId: articleId
    };

    console.log("===+++++++++++++++++++++++> commentData: ", commentData);
    // ToDo:  create the call to the comments html route

    API.createComment(commentData);
    
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


$commentInput.on("click", handleAddCommentBtnClick);
$commentDelete.on("click", handleDeleteCommentsBtnClick)

let $articlesDelete = $("#delete-articles");

var handleDeleteArticlesBtnClick = function(event) {
    event.preventDefault();
    console.log("starting fn() handleListCommentsBtnClick {{{{{{{{{{{");
    // API.deleteArticles(articleId);
    
}
// $commentDelete.on("click", handleDeleteCommentsBtnClick)

// $("#delete-articles").on("click", function(event) {
//     event.preventDefault();
//     console.log("++++++++==============> Clicked the delete Article function");
//   });