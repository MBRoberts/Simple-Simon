'use strict';

$(document).ready(function() {

    $('#video').off('play');
    var buttonArray = [],
        compareArray = [],
        round = 1,
        count = 0;

    //  The light function simply lights the color passed in by the roundLoop function
    function lightUp(color, delay) {   

        $(color).animate( {
            opacity : .35,
            boxShadow : '0 0 30px #fff'
        }, delay). animate( {
            opacity : 1,
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

                    round++;
                    $(".box").off('click');
                    nextRandNum();

                } else {  //  if there are still elements in the array it deletes the eventlistener and recalls this function

                    $(".box").off('click');
                    uiClicks(compareArray);

                }
            } else {  //  if the wrong key is entered the game is stopped

                $(".box").off('click');
                setTimeout(function(){
                    location.reload();
                }, 6000)
                $('#video').attr('src', 'https://www.youtube.com/embed/VDW0ZnZxjn4?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0');
                $('#video').css('display', 'block');

            }
        });
    }

    // The roundLoop function will continue lighting up random colors then calling itself until the count has reached the round
    function roundLoop(buttons) {
        
        setTimeout(function() {

            switch (buttons[count]) {   //  Lights up color according to the random number
                case 0 :
                    lightUp('#red', 400);
                    break;
                case 1 :
                    lightUp('#blue', 400);
                    break;
                case 2 :
                    lightUp('#green', 400);
                    break;
                case 3 :
                    lightUp('#yellow', 400);
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
        $('#round').html("<h1>Round: " + round + "</h1>");  //  Displays the round number
        roundLoop(compareArray);    //  Starts light sequence

    }
    
    $('#start').click(function(e){
        $('#disappear').fadeOut("slow", function(){
            nextRandNum();  //  Starts game
        });
    });
});





















