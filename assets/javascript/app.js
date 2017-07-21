$(document).ready(function(){
	//premade buttons
	var knownFood = ["hamburger", "hotdog", "turkey", "ham", "bacon"];


	//when add button is clicked make button with the input value as data
	function makeButton(){
		$("#foodButtons").empty();
		//user input to variable

		for(i = 0; i < knownFood.length; i++){
			var create = $("<button>");
			// adding class
			create.addClass("btn choose");
			//adding attributes
			create.attr("data-food", knownFood[i]);
			//add initial text for button
			create.text(knownFood[i]);
			// append to the html
			$("#foodButtons").append(create);
		}
		console.log(knownFood);
	};	


	// This function handles the event of hitting the submit button to make buttons
	$("#add-food").on("click", function(event) {
    	// Preventing the buttons default behavior when clicked (which is submitting a form)
    	event.preventDefault();
    	// This line grabs the input from the textbox
    	var foodInput = $("#food-input").val().trim();
    	console.log(foodInput);
    	// Adding the movie from the textbox to our array
    	knownFood.push(foodInput);
    	// Calling renderButtons which handles the processing of our movie array
    	makeButton();
	});

	makeButton();

	$(document).on("click", ".choose", function() {
		//empty the DOM before refilling
		$("#pictures").empty();
    	// Grabbing and storing the data-food property value from the button
    	var food = $(this).attr("data-food");
    	// Constructing a queryURL using the animal name
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		food + "&api_key=dc6zaTOxFJmzC&limit=10";

  		// Performing an AJAX request with the queryURL
  		$.ajax({
        	url: queryURL,
        	method: "GET"
    	})
    	// After data comes back from the request
    	.done(function(response) {
        	console.log(queryURL);
        	console.log(response);
        	// storing the data from the AJAX request in the results variable
        	var results = response.data;

        	// Looping through each result item
          	for (var i = 0; i < results.length; i++) {

        		// Creating and storing a div tag
        		var foodDiv = $("<div>");

        		// Creating a paragraph tag with the result item's rating
        		var p = $("<p>").text("Rating: " + results[i].rating);

        		// Creating and storing an image tag
        		var foodImage = $("<img>");
        		foodImage.addClass("gif");
        		// Setting the src attribute of the image to a property pulled off the result item
        		var still = results[i].images.fixed_height_small_still.url;
        		var anime = results[i].images.fixed_height_small.url;
    			foodImage.attr("data-still", still);
    			foodImage.attr("data-animate", anime);
    			foodImage.attr("data-state", "still");
    			foodImage.attr("src", still);
        		//Appending the paragraph and image tag to the animalDiv
        		foodDiv.append(p);
        		foodDiv.append(foodImage);

        		// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        		$("#pictures").append(foodDiv);
      		}
    	});
	});

	$(document).on("click",".gif", function() {
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
});