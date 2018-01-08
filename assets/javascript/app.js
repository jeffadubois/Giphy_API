$(document).ready(function() {
     //Array for topics to be searched for
     var topics = ["snowshoeing", "cross country skiing", "alpine skiing", "winter camping", "hot camping"];
	 var apiKey = "6P8yisGM2pBhGfXKyEbqaXuDaiHs1eN4";
	 var maxNumResults = "10";


 	function retrieveAndDisplayImagesForTopic() {
       console.log("this");
	   console.log(this);
	   console.log($(this));
	   var topic = $(this).text;
	   console.log("this.text is:");
	   console.log(topic);

	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=" + maxNumResults;
      console.log("queryURL is ");
	  console.log(queryURL);

	  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
			console.log("results are:");
        	console.log(results);
			
        	for (var i = 0; i < results.length; i++) {
        	
				var imageDiv = $("<div class='col-md-4'>");

				var rating = results[i].rating;
				var dataAnimated = results[i].images.fixed_height.url;
				var dataStill = results[i].images.fixed_height_still.url;
				var topicImage = $("<img>");
				topicImage.attr("src", dataStill);
				topicImage.attr("data-state", "still");
				topicImage.attr("data-still", dataStill);
				topicImage.attr("data-animate", dataAnimated);
				topicImage.addClass("gif");
				
				var p = $("<p>").text("Rating: " + rating);
				imageDiv.append(p);
				imageDiv.append(topicImage);
				$("#gifs-appear-here").prepend(imageDiv);

            }//end for
	     });//ajax.done
    }//end function retrieveAndDisplayImagesForTopic()

  //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
	$("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        console.log(topics);
        $("#topic-input").val('');
        displayButtons();
      });

  //Function iterates through topics array to display button with array values in "myButtons" section of HTML
	function displayButtons() {
	   console.log("in displayButtons length of topics is " + topics.length);
	   
       $("#topicButtons").empty();
       for (var i = 0; i < topics.length; i++) {
           var topicButton = $('<button class="btn btn-primary displayTopic">');
		   console.log("In display buttons i is " + i);
           topicButton.text(topics[i]);
           $("#topicButtons").append(topicButton);
		   console.log("Adding another button." + topics[i]);
        }
    }

  
  $(".displayTopic").on("click", retrieveAndDisplayImagesForTopic());
  
  	$("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
		console.log("topics is:");
        console.log(topics);
        $("#topic-input").val('');
        displayButtons();
      });

  //Animate or make static.
  $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	
	 //display the buttons that will retrieve images from giphy.
  displayButtons();
    

});