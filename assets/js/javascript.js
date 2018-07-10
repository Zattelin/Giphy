        // Topics variable
        var cartoons = ["Thunder Cats", "Transformers", "He Man", "Smurfs", "Muppet Babies", "Rescue Rangers", "Speed Racer"];   
        function renderButtons() {
        // Deleting the gifs prior to adding new gifs
        $("#buttons-view").empty();
        // Looping through the array of cartoons
        for (var i = 0; i < cartoons.length; i++) {
        // Then dynamicaly generating buttons for each Cartoon in the array
        var a = $("<button>");
        // Adding a class of Cartoon to our button
        a.addClass("Cartoon rainbow-button");
        // Adding a data-attribute
        a.attr("data-name", cartoons[i]);
        // Providing the initial button text
        a.text(cartoons[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
        }
      }

        //get input from user. Store input in a variable. create and on click function for the submit buttong to render new items into our array which need to be buttons. 
        $('#add-gif').on('click', function(event){
        event.preventDefault();
        userInput = $('#gif-input').val().trim();
        console.log(userInput);
        cartoons.push(userInput);
        console.log(cartoons);
        renderButtons();
        })
        $(document).on('click', ".Cartoon", function(){
 		var x = $(this).data("name");
 		console.log(x);

        // Constructing a queryURL using the Cartoon name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +x+
            "&api_key=kqiKKvJG2sEYdrlq3DGOTos6nyNHFnNG&limit=10";
            
        // Performing an AJAX request with the queryURL
            $.ajax({
             url: queryURL,method: "GET"})
        // After data comes back from the request
            .done(function(response) {
             console.log(queryURL);
             console.log(response);

         
        // Looping through each result item
        for(var i=0; i<response.data.length;i++){
        // Creating and storing a div tag
             var CartoonDiv = $("<div>");
        // Creating a paragraph tag with the result item's rating
             var p = $("<p>").text("Rating: " + response.data[i].rating);  

        // Creating and storing an image tag
             var CartoonImage = $("<img>");
             CartoonImage.attr('src',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
 			       CartoonImage.attr('data-still',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
 			       CartoonImage.attr('data-animate',response.data[i].images.fixed_height.url.replace(/^http:\/\//i, 'https://'));
 			       CartoonImage.attr('data-state',"still");
 			    	 CartoonImage.addClass("gif");
 			     	 CartoonDiv.append(p);
             CartoonDiv.append(CartoonImage);
     
        // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div      
             $("#gifs-appear-here").prepend(CartoonDiv);

     //here is our on click function to start and stop the gifs once loaded onto the page
 				
 			} //end of the for loop
 			$(document).on("click", "img", function() {
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
    })
 		})
 	}) 	
 renderButtons();