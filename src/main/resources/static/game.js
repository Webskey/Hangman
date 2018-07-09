function startGame(){
	$("#game").show();
	$(".game-progress").show();
	$("#player1").hide();
	$("#player2").hide();
}

function endGame(attempts){
	$("#game").hide();
	if(attempts > 0){
		var r = "#win";
		$('#p1-score').text(parseInt($('#p1-score').text()) + 1);
	}else{
		var r = "#lost";
		$('#p2-score').text(parseInt($('#p2-score').text()) + 1);
	}
	console.log(r);
	$(r).show();



	setTimeout(function() {
		$(r).hide();
		if(player == 1)
			player2();
		else
			player1();
	}, 4000);
}

function setWord(){
	startGame();
	word = $('#word').val();
	console.log(word);
	stompClient.send("/receiver/room/" + room + "/setWord", {}, JSON.stringify({'word': word}));
	$('#word').val("");
}

function letterClicked(value) {	
	var id = "#" + value;
	$(id).prop("disabled", true);	
	stompClient.send("/receiver/room/" + room, {}, JSON.stringify({'letter': value}));
}

function play(letter, guess, attempts) {	
	console.log("Choosen letter : " + letter);	
	$('#guess').text(guess);
	$('#attempts').text(attempts);
	//$('.game-progress').hide();
	$('#' + (attempts + 1) + '-attempts').hide();
}