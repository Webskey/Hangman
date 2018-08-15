var stompClient = null;
var room = 0;
var player = null;
var room1 = 0;
var room2 = 0;
var room3 = 0;
var room4 = 0;
var word = null;
var roomStomp = null;
var userMap = null;
var pIndex = 0;

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected();
		console.log("Connected to Websocket");

		stompClient.subscribe('/broker/usermap', function (usermap) {	
			userMap = JSON.parse(usermap.body);
			roomManagment(usermap);
		});
		
		stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': room, 'pIndex': pIndex}));	
	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function setConnected() {	
	$("#welcome-div").hide();
	$("#lobby-div").show();
}

function roomManagment(usermap){
	var usrmap = JSON.parse(usermap.body);

	for (var i = 1; i < 5; i++) {
		if(i == room){
			var numOfPlayers =  eval('room' + i);

			if(numOfPlayers  != usrmap[i].length)
				newScoreboard();

			if(numOfPlayers > usrmap[i].length){
				alert("Player left room.");
				$("#player2").hide();
				$('#setWord-btn').attr("disabled", true);
				$("#game").hide();
				player1();
				pIndex = 1;
			}

			if(numOfPlayers < usrmap[i].length && usrmap[i].length > 1)
				$('#setWord-btn').attr("disabled", false);

			if(numOfPlayers < usrmap[i].length && usrmap[i].length > 1 && pIndex == 1)
				alert("New player joined this room.");
		}
		eval('room' + i + '= usrmap[' + i + '].length;');

		if(usrmap[i].length > 2){
			$('#room' + i).prop("disabled", true);
		}else{
			$('#room' + i).prop("disabled", false);
		}
	}	
}

function newScoreboard(){
	var table = "";

	for(var i = 0; i < userMap[room].length; i ++)
		table += "<tr id = '" + userMap[room][i].username + "'><td id = 'name'>" + userMap[room][i].username + "</td><td id = 'scores'>" + 0 + "</td></tr>";

	$("#score-table").html(table);
}

function joinRoom(num){
	stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': num, 'prevRoom': room, 'pIndex': pIndex}));
	room = num;

	connectChat($("#username").val());

	$("#room-nr-info").text('Room nr : ' + room);

	var playersAmount = eval('room' + num);
	if(playersAmount == 0){
		pIndex = 1;
		player1();
		$('#setWord-btn').attr("disabled", true);
	}else{
		pIndex = 2
		player2();
	}

	$("#lobby-div").hide();	
	$("#room-div").show();

	roomStomp = stompClient.subscribe('/broker/room/' + num, function (hangman) {
		if(JSON.parse(hangman.body).guess == JSON.parse(hangman.body).word){
			$('.letter-button').prop("disabled", true);
			setTimeout(function() {
				endGame(JSON.parse(hangman.body).attempts);
			}, 2000);		
		}
		if(JSON.parse(hangman.body).letter == null){
			startGame();
		}
		play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
	});
}

function exitRoom(){
	console.log("Leaving room " + room);
	stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': 0, 'prevRoom': room, 'pIndex': pIndex}));
	room = 0;
	player = null;

	roomStomp.unsubscribe();

	$("#game-div").hide();
	$("#room-div").hide();
	$("#lobby-div").show();
	$("#player1").hide();
	$("#player2").hide();
}

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

$(function () {
	$("#connect-form").on('submit', function (e) {
		e.preventDefault();
		connect();
	});
	$("#setWord").on('submit', function (e) {
		e.preventDefault();
		setWord();
	});
});