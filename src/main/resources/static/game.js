function startGame(){
	$("#game").show();
	$("#player1").hide();
	$("#player2").hide();
}

function endGame(result){
	$("#game").hide();
	console.log("You " + result);
	var r = "#" + result;
	console.log(r);
	$(r).show();
	
	setTimeout(function() {
		$(r).hide();
		if(player == 1)
			player2();
		else
			player1();
	}, 5000);
}

function setWord(){
	word = $('#word').val();
	console.log(word);
	stompClient.send("/receiver/room/" + room + "/setWord", {}, JSON.stringify({'word': word}));
	$('#word').val("");
}

function letterClicked(value) {	
	var id = "#"+value;
	$(id).prop("disabled", true);	
	stompClient.send("/receiver/room/" + room, {}, JSON.stringify({'letter': value}));
}

function play(letter, guess, attempts) {	
	console.log("Choosen letter : " + letter);	
	$('#guess').text(guess);
	$('#attempts').text(attempts);
}