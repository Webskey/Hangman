function startGame(){
	$("#game").show();
	$(".game-progress").show();
	$("#letters").show();
	$("#player1").hide();
	$("#player2").hide();
}

function endGame(attempts){
	$("#letters").hide();
	$(".game-progress").hide();
	if(attempts > 0){
		won(2);
	}else{
		won(1);
	}

	setTimeout(function() {
		$("#game").hide();
		$(".result").hide();
		if(player == 1){
			player2();
		}else{
			player1();
		}	
	}, 4000);
}

function won(winner){
	if(player == winner)
		console.log("============= I WON ===========");
	
	addPoints(player == winner);
	$('#win').show();
}

function addPoints(amIWinner){
	$('#score-table tr').each(function(){
		var myRow = $(this).attr('id') == $("#username").val();
		if(myRow == amIWinner){
			$("td", this).each(function(){
				if($(this).attr('id') == 'scores')
					$(this).html(parseInt($(this).html()) + 1);
				else
					$('#winner').html($(this).html() + ' SCORES!');
			});
		}
	});
}

function setWord(){
	word = $('#word').val();
	console.log(word);
	stompClient.send("/receiver/room/" + room + "/setWord", {}, JSON.stringify({'word': $('#word').val()}));
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