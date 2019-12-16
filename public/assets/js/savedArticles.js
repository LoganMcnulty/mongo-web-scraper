// AJAX request for getting all saved articles, and populating the page with them
$.ajax({
  method: "GET",
  url: "/api/savedArticles"
}).then(function(data) {
  console.log(data);
    for (i=0; i<20; i++){
      var articleDiv = $("<div>").addClass("card card-custom").attr("data-_id",data[i]._id).attr("style","margin-bottom:1%")
      var cardHead = $("<div>").addClass("card-header")
      var cardH3 = $("<h3>")
      var articleOne = $("<a>").addClass("article-link").attr("target","_blank").attr("rel","noopener noreferrer").attr("href", data[i].link).text(data[i].title) 
      var articleTwo = $("<a>").addClass("btn btn-success delete").attr("id","deleteSavedArticle").text(`Delete ✗`).attr("style","margin-left:2%").attr("data-_id",data[i]._id)
      var articleThree = $("<a>").addClass("btn btn-success").attr("id","commentArticle").text(`Comment`).attr("style","margin-left:2%")
      cardH3.append(articleOne).append(articleTwo).append(articleThree)
      cardHead.append(cardH3)
      var cardBody = $("<div>").addClass("card-body")
      var cardImage = $("<img>").addClass("img-fluid").attr("src", data[i].image).attr("alt", "Responsive Image").attr("style","display: block; width:10em; float:left; border-radius:20%")
      var cardBodyText = $("<h5>").attr("style","float:left; padding:1%; width:80%").text(data[i].summary)
      cardBody.append(cardImage).append(cardBodyText)
      articleDiv.append(cardHead).append(cardBody)
      $("#articleContainer").append(articleDiv)
  }
})

// function for clearing all saved articles
$(document).on("click", "#dangerButtonClear", function() {
  $.ajax({
    method: "get",
    url: "/api/clearSavedArticles",
  })
    .then(function() {
      setTimeout("location.reload(true);",2000);
      alert("Clearing All Saved Articles")
    });
});

// function for removing a saved article
$(document).on("click", "#deleteSavedArticle", function() {
  $(this).parent().parent().parent().hide()
  var deleteID = $(this).attr("data-_id");
  console.log(deleteID)
  $.get("/api/savedArticles/delete/" + deleteID,
    function(err) {
      if (err) {console.log(err)}
      console.log("deleting saved article")
    });
});
