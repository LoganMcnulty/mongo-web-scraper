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

$(document).on("click", "#dangerButtonClear", function() {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "get",
    url: "/api/clearSavedArticles",
  })
    // With that done
    .then(function() {
      setTimeout("location.reload(true);",2000);
      alert("Clearing All Saved Articles")
    });
});

$(document).on("click", "#deleteSavedArticle", function() {
  var deleteID = $(this).attr("data-_id");
  console.log(deleteID)
  $.get("/api/savedArticles/:" + deleteID,
    function(err) {
      console.log("deleting saved article")
    });
});


  // Whenever someone clicks a p tag
  // $(document).on("click", "p", function() {
  //   // Empty the notes from the note section
  //   $("#notes").empty();
  //   // Save the id from the p tag
  //   var thisId = $(this).attr("data-id");
  
  //   // Now make an ajax call for the Article
  //   $.ajax({
  //     method: "GET",
  //     url: "/articles/" + thisId
  //   })
  //     // With that done, add the note information to the page
  //     .then(function(data) {
  //       console.log(data);
  //       // The title of the article
  //       $("#notes").append("<h2>" + data.title + "</h2>");
  //       // An input to enter a new title
  //       $("#notes").append("<input id='titleinput' name='title' >");
  //       // A textarea to add a new note body
  //       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  //       // A button to submit a new note, with the id of the article saved to it
  //       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
  //       // If there's a note in the article
  //       if (data.note) {
  //         // Place the title of the note in the title input
  //         $("#titleinput").val(data.note.title);
  //         // Place the body of the note in the body textarea
  //         $("#bodyinput").val(data.note.body);
  //       }
  //     });
  // });
  
  // When you click the savenote button
  // $(document).on("click", "#savenote", function() {
  //   // Grab the id associated with the article from the submit button
  //   var thisId = $(this).attr("data-id");
  
  //   // Run a POST request to change the note, using what's entered in the inputs
  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/" + thisId,
  //     data: {
  //       // Value taken from title input
  //       title: $("#titleinput").val(),
  //       // Value taken from note textarea
  //       body: $("#bodyinput").val()
  //     }
  //   })
  //     // With that done
  //     .then(function(data) {
  //       // Log the response
  //       console.log(data);
  //       // Empty the notes section
  //       $("#notes").empty();
  //     });
  
  //   // Also, remove the values entered in the input and textarea for note entry
  //   $("#titleinput").val("");
  //   $("#bodyinput").val("");
  // });
  