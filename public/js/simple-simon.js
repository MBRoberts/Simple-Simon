'use strict';
$(document).ready(function() {

var buttonArray = [],
    compareArray = [],
    round,
    count = 0;

//  The light function simply lights the color passed in by the roundLoop function
function lightUp(color, delay) {   

    $(color).animate( {
        opacity : 1,
        boxShadow : '0 0 30px #fff'
    }, delay). animate( {
        opacity : .25,
        boxShadow : '10 10 10px #111'
    }, delay);

}

//  The uiClicks function saves the button the user clicks on
function uiClicks(compareArray) {

    $('.box').on("click", function(e){
        
        var buttonToLight = "#" + $(this).attr('id');  //  assigns the id of the button clicked to a variable
        var buttonVal = $(this).attr('value');

        lightUp(buttonToLight, 100);  //  sends the color clicked on to be lit up by the lightUp function
         
        if (buttonVal == compareArray[0]) {  //  Compares the button pressed with the first button in the array

            compareArray.shift();  //  deletes the first index

            if (compareArray.length == 0){  //  once the array is empty it shuts off the eventlistener and returns to the nextRandNum functoin 

                $(".box").off('click');
                nextRandNum();

            } else {  //  if there are still elements in the array it deletes the eventlistener and recalls this function

                $(".box").off('click');
                uiClicks(compareArray);

            }
        } else {  //  if the wrong key is entered the game is stopped

            console.log('you lose');
            $(".box").off('click');
        }
    });
}

// The roundLoop function will continue lighting up random colors then calling itself until the count has reached the round
function roundLoop(buttons) {
    
    setTimeout(function() {

        switch (buttons[count]) {   //  Lights up color according to the random number
            case 0 :
                lightUp('#red', 500);
                break;
            case 1 :
                lightUp('#blue', 500);
                break;
            case 2 :
                lightUp('#green', 500);
                break;
            case 3 :
                lightUp('#yellow', 500);
                break;
        }
        count++;

        if (count < round) {  //  Will continue running the function until the count reaches the round number
            roundLoop(buttons);
        } else {
            uiClicks(buttons);  //  Once the sequence is complete it calls the UI function
        }
    }, 1000)  //  Delays the loop by 1 sec
}

function nextRandNum() {

    count = 0;
    var randNum = Math.floor((Math.random() * 4));
    buttonArray.push(randNum);  //  Pulls a random number between 0-3 and pushes it onto the button array
    compareArray = buttonArray.slice(0);  //  copys the buttonArray so the array can be modified throughout the program without modifying the original sequence

    round = buttonArray.length; // determines the round by the length of the array

    $('#round').html("Round: " + round);  //  Displays the round number
    roundLoop(compareArray);    //  Starts round
}

nextRandNum();  //  Starts game

});





















