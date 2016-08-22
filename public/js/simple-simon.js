'use strict';

$(document).ready(function() {

    var music = document.getElementById("music"),
        video = document.getElementById('background'),
        sequenceArray = [],
        sequenceArrayCopy = [],
        round = 1,
        sequenceSpeed = 500;

    //  Sets rate and volume of background video and music
    music.playbackRate = .5;
    music.volume = .25;
    video.playbackRate = .5;

        

    //  The light function simply lights the color passed in by the roundLoop function
    function lightUp(btn, delay) {   

        $(btn).animate( {
            opacity : 1,
            boxShadow : '0 0 30px #fff'
        }, delay). animate( {
            opacity : .35,
            boxShadow : '10 10 10px #111'
        }, delay);

    }

    //  The uiClicks function saves the button the user clicks on
    function uiClicks(sequenceCheckArray) {

        $('.box').on("click", function(e){
            
            var buttonToLight = "#" + $(this).attr('id');  //  assigns the id of the button clicked to a variable
            var buttonVal = $(this).attr('value');

            lightUp(buttonToLight, 100);  //  sends the color clicked on to be lit up by the lightUp function
             
            if (buttonVal == sequenceCheckArray[0]) {  //  Compares the button pressed with the first button in the array

                sequenceCheckArray.shift();  //  deletes the first index

                if (sequenceCheckArray.length == 0){  //  once the array is empty it shuts off the eventlistener and returns to the nextRandNum functoin 

                    round++;
                    $(".box").off('click');
                    nextRandNum();

                } else {  //  if there are still elements in the array it deletes the eventlistener and recalls this function

                    $(".box").off('click');
                    uiClicks(sequenceCheckArray);

                }
            } else {  //  if the wrong key is entered the music is stopped and willie video plays then the page reloads

                $(".box").off('click');
                setTimeout(function(){
                    location.reload();
                }, 6000)
                music.pause();
                $('#video').attr('src', 'https://www.youtube.com/embed/VDW0ZnZxjn4?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0');
                $('#video').css('display', 'block');

            }
        });
    }

    // The roundLoop function will continue lighting up random colors then calling itself until the count has reached the round
    function roundLoop(sequence, count) {
        
        setTimeout(function() {

            switch (sequence[count]) {   //  Lights up color according to the random number
                case 0 :
                    lightUp('#red', sequenceSpeed);
                    break;
                case 1 :
                    lightUp('#blue', sequenceSpeed);
                    break;
                case 2 :
                    lightUp('#green', sequenceSpeed);
                    break;
                case 3 :
                    lightUp('#yellow', sequenceSpeed);
                    break;
            }
            count++;

            if (count < round) {  //  Will continue running the function until the count reaches the round number
                roundLoop(sequence, count);
            } else {
                uiClicks(sequence);  //  Once the sequence is complete it calls the UI function
            }
        }, (sequenceSpeed * 2))  //  Delays the loop by 1 sec
    }


    function nextRandNum() {

        if(round % 3 == 0) {  //  Increases the speed of the video, music, and animations
            music.playbackRate += .5;
            video.playbackRate += .75;
            if(sequenceSpeed > 200) {
                sequenceSpeed -= 100;
            }
        }

        var count = 0;
        var randNum = Math.floor((Math.random() * 4));
        sequenceArray.push(randNum);  //  Pulls a random number between 0-3 and pushes it onto the button array
        var sequenceArrayCopy = sequenceArray.slice(0);  //  copys the sequenceArray so the array can be modified throughout the program without modifying the original sequence
        console.log(sequenceArray);
        $('#round').html("Round: " + round);  //  Displays the round number
        roundLoop(sequenceArrayCopy, count);    //  Starts light sequence

    }
    
    $('#start').click(function(e){
        $('#disappear').fadeOut("slow", function(){
            nextRandNum();  //  Starts game
        });
    });
});





















