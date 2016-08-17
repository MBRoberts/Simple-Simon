'use strict';

$(document).ready(function() {

var randNum = Math.floor((Math.random() * 4));
console.log(randNum);

switch (randNum) {
	case 0 :
		$('#red').css('opacity', 1);
		break;
	case 1 :
		$('#blue').css('opacity', 1);
		break;
	case 2 :
		$('#green').css('opacity', 1);
		break;
	case 3 :
		$('#yellow').css('opacity', 1);
		break;
}
});