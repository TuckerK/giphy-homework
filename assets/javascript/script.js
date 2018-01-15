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
      var animated = response.data[i].images.fixed_height.url;

      var gif = $("<img>")
        .attr("src", still)
        .attr('data-still', still)
        .attr('data-animated', animated)
        .attr('data-state', 'still')
        .addClass("gif");

      var rating = $("<p>").text("Rating: " + response.data[i].rating);

      var gifDiv = $('<div>').addClass('gifDiv');

      gifDiv.append(rating, gif);

      // gifDiv.html(gif);

      $('#gifContainer').append(gifDiv);

      console.log(response.data[i]);
      // $(document).on("click", ".gif", function() {
      //   var state = $(this).attr("src");
      //   if (state == still){
      //     alert('the state is still');
      //   }
      // });
    }
    
  });
}

function animateGifs(gif){

  console.log(gif);
  console.log(gif.data('still'));
  console.log(gif.data('animated'));

  if(gif.attr('data-state') === 'still'){
    console.log("data state before change", gif.attr('data-state'));
    gif.attr('data-state', 'animated');
    gif.attr('src', gif.data('animated'));
    console.log("value of gif if", gif);
    console.log("data state after change", gif.attr('data-state'));
  } else if(gif.attr('data-state') === 'animated') {
    console.log("data state before change", gif.attr('data-state'));
    gif.attr('data-state', 'still');
    gif.attr('src', gif.data('still'));
    console.log("value of gif else", gif);
    console.log("data state after change", gif.attr('data-state'));
  }

}

$('#gifContainer').on('click', '.gif', function(){

  animateGifs($(this));

  console.log('');

});


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
