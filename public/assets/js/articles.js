// Grab the articles as a json
$.ajax({
  method: "GET",
  url: "/api/articles/"
}).then(function(data) {
  for (i=0; i<20; i++){
    var articleDiv = $("<div>").addClass("card card-custom").attr("data-_id",data[i]._id).attr("style","margin-bottom:1%")
    var cardHead = $("<div>").addClass("card-header")
    var cardH3 = $("<h3>")
    var articleOne = $("<a>").addClass("article-link").attr("target","_blank").attr("rel","noopener noreferrer").attr("href", data[i].link).text(data[i].title) 
    var articleTwo = $("<a>").addClass("btn btn-success delete").attr("id","saveArticle").text(`Save ✔`).attr("style","margin-left:2%").attr("data-_id",data[i]._id).attr("title", data[i].title).attr("link",data[i].link).attr("image",data[i].image).attr("summary",data[i].summary)
    cardH3.append(articleOne).append(articleTwo)
    cardHead.append(cardH3)
    var cardBody = $("<div>").addClass("card-body")
    var cardImage = $("<img>").addClass("img-fluid").attr("src", data[i].image).attr("alt", "Responsive Image").attr("style","display: block; width:10em; float:left; border-radius:20%")
    var cardBodyText = $("<h5>").attr("style","float:left; padding:1%; width:80%").text(data[i].summary)
    cardBody.append(cardImage).append(cardBodyText)
    articleDiv.append(cardHead).append(cardBody)
    $("#articleContainer").append(articleDiv)
  } 
})
  
$(document).on("click", "#dangerButtonNew", function() {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "get",
    url: "/api/scrape",
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      setTimeout("location.reload(true);",2000);
      alert("Pulling the latest News")
    });
});

$(document).on("click", "#dangerButtonClear", function() {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "get",
    url: "/api/clearArticles",
  })
    // With that done
    .then(function() {
      setTimeout("location.reload(true);",2000);
      alert("Clearing All Articles")
    });
});

$(document).on("click", "#saveArticle", function() {
  var newSave = {};
  newSave.title = $(this).attr("title");
  newSave.image = $(this).attr("image");
  newSave.summary = $(this).attr("summary");
  newSave.link = $(this).attr("link");

  var dataID = $(this).attr("data-_id");


  $.post("/api/savedArticles", newSave,
    function(err) {
      console.log("saving article")
    });
});