var stompClient = null;
var room = null;
var players = null;
var inRoom = false;
var player = null;
var wroom = null;
var roomq = null;
var roomqq = null;
var roomek = null;
var word = null;

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected();
		console.log("Connected to Websocket");
		stompClient.subscribe('/broker/main', function (hangman) {
			console.log("Got message from main");
		});
	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function setConnected() {	
	$("#welcome").hide();
	$("#lobby").show();
}

function checkFull(num){
	room = num;
	players = 0;

	roomq = stompClient.subscribe('/broker/room/' + num, function (hangman) {
		if(JSON.parse(hangman.body).hello === undefined){
			if(JSON.parse(hangman.body).guess == "win" || JSON.parse(hangman.body).guess == "lost")
				endGame(JSON.parse(hangman.body).guess);
			else
				play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		}else{
			console.log("Sending to sayingHello");
			stompClient.send("/receiver/room/" + num + '/sayingHello', {});
		}
	});

	wroom = stompClient.subscribe('/receiver/room/' + num, function (hangman) {		
		console.log("Subscribbed room nr: " + room);
		stompClient.send("/receiver/room/" + num + '/canIjoin', {});	
	});

	roomqq = stompClient.subscribe('/broker/room', function (hangman) {		
		players = players + 1;
		console.log("Added players " + players);
	});

	roomek = stompClient.subscribe('/broker/room/' + num + "/game", function (hangman) {			
		$('#guess').text(JSON.parse(hangman.body).guess);
		startGame();
	});

	$("#loading-gif").show();	
	setTimeout(function() {
		console.log("Players : " + players);
		if(!inRoom)
			checku(players);
		$("#loading-gif").hide();
	}, 3000);
}

function checku(players){
	if(players == 1)
		player1();
	if(players == 2)
		player2();
	if(players >= 3) {
		console.log("Room " + room + " is full");
		roomq.unsubscribe();
		wroom.unsubscribe();
		roomqq.unsubscribe();
		roomek.unsubscribe();
	}
}

function player1(){
	player = 1;
	inRoom = true;
	//$("#lobby").hide();		
	$("#player1").show();	
	$('.letter-button').attr("disabled", true);
}

function player2(){
	console.log("Player2");
	player = 2;
	inRoom = true;
	//$("#lobby").hide();	
	$("#player2").show();	
}

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

$(function () {
	$("form").on('submit', function (e) {
		e.preventDefault();
	});
	$( "#connect" ).click(function() { connect(); });
});