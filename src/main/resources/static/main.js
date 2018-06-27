var stompClient = null;
var room = null;
var players = null;
var inRoom = false;
var player = null;
var room1 = null;
var room2 = null;
var room3 = null;
var room4 = null;
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

	room1 = stompClient.subscribe('/broker/room/' + num, function (hangman) {
		if(JSON.parse(hangman.body).hello === undefined){
			if(JSON.parse(hangman.body).guess == "win" || JSON.parse(hangman.body).guess == "lost")
				setTimeout(function() {
					endGame(JSON.parse(hangman.body).guess);
				}, 2000);			
				play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		}else{
			console.log("Sending to sayingHello");
			stompClient.send("/receiver/room/" + num + '/sayingHello', {});
		}
	});

	room2 = stompClient.subscribe('/receiver/room/' + num, function (hangman) {		
		console.log("Subscribbed room nr: " + room);
		stompClient.send("/receiver/room/" + num + '/canIjoin', {});	
	});

	room3 = stompClient.subscribe('/broker/room/' + num + "/players", function (hangman) {		
		players = players + 1;
		console.log("Added players " + players);
	});

	room4 = stompClient.subscribe('/broker/room/' + num + "/game", function (hangman) {			
		$('#guess').text(JSON.parse(hangman.body).guess);
		$('#attempts').text(JSON.parse(hangman.body).attempts);
		startGame();
	});
	$("#lobby").hide();	
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
		exitRoom();
	}
}

function exitRoom(){
	console.log("Leaving room " + room);
	inRoom = false;
	room = null;
	players = 0;
	player = null;
	room1.unsubscribe();
	room2.unsubscribe();
	room3.unsubscribe();
	room4.unsubscribe();
	$("#game-div").hide();
	$("#lobby").show();
	$("#player1").hide();
	$("#player2").hide();
}

function player1(){
	room2.unsubscribe();
	room3.unsubscribe();
	player = 1;
	inRoom = true;
	$("#lobby").hide();		
	$("#game-div").show();	
	$("#player1").show();	
	//$('.letter-button').attr("disabled", true);
}

function player2(){
	console.log("Player2");
	player = 2;
	inRoom = true;
	room2.unsubscribe();
	room3.unsubscribe();
	$("#lobby").hide();		
	$("#game-div").show();
	$("#player2").show();	
	$('.letter-button').attr("disabled", false);
}

$(function () {
	$("form").on('submit', function (e) {
		e.preventDefault();
	});
	$( "#connect" ).click(function() { connect(); });
});