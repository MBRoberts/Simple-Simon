'use strict';

$(document).ready(function() {

    var music = document.getElementById("music"),
        backgroundVideo = document.getElementById('background'),
        sequenceArray = [],
        sequenceArrayCopy = [],
        sequenceSpeed = 500;

    //  Sets rate and volume of background video and music
    music.playbackRate = .5;
    backgroundVideo.playbackRate = .5;
    music.volume = .4;

    //  Increases Speed and volume of animations, music, and background image
    function speed() {
        music.playbackRate += .1;
        backgroundVideo.playbackRate += .2;
        if (music.volume < 1){  //  Volume can't increase past 1
            music.volume += .05;
        }
        if(sequenceSpeed > 200) {
            sequenceSpeed -= 25;
        }
    }

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

    // --------------------------Step 3-------------------------------
    // Sets a listener to each div;  animates the button the user clicks on; compares each click to the passed in copied array; if clicks are correct it starts back at Step 1 if clicks are incorrect displays "lose video" 
    function uiClicks(sequenceCheckArray) {

        $('.box').on("click", function(e){
            
            var buttonToLight = "#" + $(this).attr('id');  //  assigns the id of the button clicked to a variable
            var buttonVal = $(this).attr('value');

            lightUp(buttonToLight, 100);  //  sends the color clicked on to be lit up by the lightUp function
             
            if (buttonVal == sequenceCheckArray[0]) {  //  Compares the button pressed with the first button in the array

                sequenceCheckArray.shift();  //  deletes the first index

                if (sequenceCheckArray.length == 0){  //  once the array is empty it shuts off the eventlistener and returns to the nextRandNum functoin 

                    $(".box").off('click');
                    nextRandNum();

                } else {  //  if there are still elements in the array it deletes the eventlistener and recalls this function

                    $(".box").off('click');
                    uiClicks(sequenceCheckArray);
                }
            } else {  //  if the wrong button is entered the music is stopped and the willie video plays then the page reloads

                $(".box").off('click');
                setTimeout(function(){
                    location.reload();
                }, 6500);
                $('#video').attr('src', 'https://www.youtube.com/embed/VDW0ZnZxjn4?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0');
                $('#video').css('display', 'block');
                music.pause();
                
            }
        });
    }

    // ---------------------------Step 2-----------------------------
    // Will light up colors according to the random numbers stored in the array; Once finished will send the copied array to the above function
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

            if (count < sequenceArray.length) {  //  Will continue running the function until the count reaches the round number
                roundLoop(sequence, count);
            } else {
                uiClicks(sequence);  //  Once the sequence is complete it calls the UI function
            }
        }, (sequenceSpeed * 2));  //  Delays the loop by 1 sec
    }

    // ------------------------Step 1----------------------------
    //  Adds a random number to the sequenceArray; Resets counts to 0; displays round; sends a copy of the sequence to above function
    function nextRandNum() {

        var count = 0;
        var randNum = Math.floor((Math.random() * 4));
        sequenceArray.push(randNum);  //  Pulls a random number between 0-3 and pushes it onto the button array
        var sequenceArrayCopy = sequenceArray.slice(0);  //  copys the sequenceArray so the array can be modified throughout the program without modifying the original sequence

        speed();  //  Increases the speed of the video, music, and animations
        console.log(sequenceArray);  // This is how I cheat!!
        $('#round').html("Round: " + sequenceArray.length);  //  Displays the round number
        roundLoop(sequenceArrayCopy, count);    //  Starts light sequence
    }

    // -----------------Start---------------------
    //  Fades out ribbon and calls above function
    $('#start').click(function(e){
        $('#disappear').fadeOut("slow", function(){
            nextRandNum();  //  Starts game
        });
    });
}); // end doc.ready





















