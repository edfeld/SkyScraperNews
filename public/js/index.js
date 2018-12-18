// index.js

$commentsList = $("#article-list");

// The API object contains methods for each kind of request we'll make
var API = {
    saveComments: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getComments: function(id) {
      return $.ajax({
        url: "comments/" + id,
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

var handleListCommentsBtnClick = function() {
    let me = 0;
    console.log("===> handleList - This: ", this);
    // ToDo:  create the call to the comments html route
    
}

$commentsList.on("click", ".comments", handleListCommentsBtnClick);