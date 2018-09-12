function player1(){
	player = 1;	
	$("#player1").show();
	$('.letter-button').prop("disabled", true);
	$("#word").focus();
}

function player2(){
	player = 2;
	$("#player2").show();	
	$('.letter-button').attr("disabled", false);
}

function startGame(){
	$("#game-div").show();
	$(".game-progress").show();
	$("#letters").show();
	$("#player1").hide();
	$("#player2").hide();
}

function setWord(){
	stompClient.send("/receiver/room/" + room + "/setWord", {}, JSON.stringify({'word': $('#word').val()}));
	$('#word').val("");
}

function play(letter, guess, attempts) {	
	$('#guess').text(guess);
	$('#attempts').text("Attempts: " + attempts);
	$('#' + (attempts + 1) + '-attempts').hide();
}

function letterClicked(value) {	
	$('#' + value).prop("disabled", true);	
	stompClient.send("/receiver/room/" + room, {}, JSON.stringify({'letter': value}));
}

function endGame(attempts){
	$("#letters").hide();
	$(".game-progress").hide();
	$('#result').show();
	
	if(attempts > 0){
		addPoints(player == 2);
	}else{
		addPoints(player == 1);
	}

	setTimeout(function() {
		$("#game-div").hide();
		$("#result").hide();
		if(player == 1){
			player2();
		}else{
			player1();
		}	
	}, 4000);
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