//this variable stores the original items and queried items to be displayed
var buttonArr = [
  "spongebob",
  "archer",
  "southpark",
  "adventure time",
  "doug",
  "rick and morty",
  "bobs burgers",
  "duck tales",
  "rockos modern life",
  "futurama"
];

function displayGifs() {
  var cartoon = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon +
    "&limit=9&api_key=dc6zaTOxFJmzC";

  $("#gifContainer").empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // for (let i = 0; i < response.data.length; i++) {

    for (let i = 0; i < response.data.length; i++) {
      var still = response.data[i].images.fixed_height_still.url;
      var animated = response.data[i].bitly_gif_url;

      var gif = $("<img>")
        .attr("src", still)
        .addClass("gif");

      var rating = $("<p>").text("Rating: " + response.data[i].rating);

      $("#gifContainer").append(rating);

      $("#gifContainer").append(gif);
      // $(document).on("click", ".gif", function() {
      //   var state = $(this).attr("src");
      //   if (state == still){
      //     alert('the state is still');
      //   }
      // });
    }
    
  });
}

//generates buttons for the original items in array and future queried buttons
function generateButtons() {
  $(".btnContainer").empty();

  //loops through array to generate buttons, add attributes, and add classes for each arr item
  for (let i = 0; i < buttonArr.length; i++) {
    //variable using jquery to create a button
    var cartoonButton = $("<button>");

    //adds classes to each button
    cartoonButton.addClass("cartoon btn-danger");

    //adds the 'data-name' attribute to each button based on its array index/name
    cartoonButton.attr("data-name", buttonArr[i]);

    //adds text/title to each button based on its array index/name
    cartoonButton.text(buttonArr[i]);

    //appends buttons for each item in the array
    $(".btnContainer").append(cartoonButton);
  }
}

$("#submit").on("click", function(event) {
  //prevents page from refreshing
  event.preventDefault();

  var cartoon = $("#input-search")
    .val()
    .trim();

  buttonArr.push(cartoon);

  console.log(buttonArr);

  generateButtons();
});

$(document).on("click", ".cartoon", displayGifs);

generateButtons();

//place gif on page
//start in paused state
//when user clicks gif should play
//receive rating data
//display correlated rating data above each gif
