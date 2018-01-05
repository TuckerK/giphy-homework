
//this variable stores the original items and queried items to be displayed
var buttonArr = ['cat', 'dog', 'mouse', 'frog', 'chimpanzee'];

//empties the button container to avoid conflicts upon refreshing
$('.btnContainer').empty();

//generates buttons for the original items in array and future queried buttons
function generateButtons(){

//loops through array to generate buttons, add attributes, and add classes for each arr item
for (let i = 0; i < buttonArr.length; i++) {
    
    //variable using jquery to create a button
    var animalButton = $('<button>');

    //adds classes to each button
    animalButton.addClass('animal btn-danger btn-lg');

    //adds the 'data-name' attribute to each button based on its array index/name
    animalButton.attr('data-name', buttonArr[i]);

    //adds text/title to each button based on its array index/name
    animalButton.text(buttonArr[i]);

    //appends buttons for each item in the array
    $('.btnContainer').append(animalButton);
};
}

generateButtons();