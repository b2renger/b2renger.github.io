var popUp = function(winNum) {
    opener.popUp(winNum);
}

var closeWindows = function() {
    // TODO is this needed ? As 'popUp' always do close the window ?
}

var showText = function(s) {	
	var myText = s;
	document.getElementById('text').innerHTML=myText;
}
