'use strict';

$(document).ready(function() {

var round = 6;
var count = 0;

//  The light function simply lights the color passed in by the roundLoop function

function lightUp(color) {   
	$(color).animate( {
		opacity : 1
	}, 500). animate( {
		opacity : .25
	}, 500);
}


// The roundLoop function will continue lighting up random colors then calling itself until the count has reached the round

function roundLoop() {

	var randNum = Math.floor((Math.random() * 4));  //  Pulls a random number between 0-3

	setTimeout(function() {

		switch (randNum) {   //  Lights up color according to the random number
			case 0 :
				lightUp('#red');
				break;
			case 1 :
				lightUp('#blue');
				break;
			case 2 :
				lightUp('#green');
				break;
			case 3 :
				lightUp('#yellow');
				break;
		}

		count++;  //  increment the count

		if (count < round) {		// Will continue running the function until the count reaches the round number
			roundLoop(round);
		}
	}, 1000)  //  Delays the loop by 1
}

roundLoop();	//  Starts round

});