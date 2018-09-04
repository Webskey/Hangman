var stompClient = null;
var room = 0;
var player = null;
var roomStomp = null;
var usersmap = new Map();

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		console.log("Connected to Websocket");
		setConnected();
		setUsersmap();

		stompClient.subscribe('/broker/usermap', function (usermap) {				
			roomManagment(usermap);
		});

		stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': room}));	
	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function setConnected() {	
	$("#welcome-div").hide();
	$("#lobby-div").show();
}

function setUsersmap(){
	for(var i = 1; i < 5; i++)
		usersmap.set(i, 0);
}

function newScoreboard(userMap){
	var table = "";

	for(var i = 0; i < userMap[room].length; i ++)
		table += "<tr id = '" + userMap[room][i].username + "'><td id = 'name'>" + userMap[room][i].username + "</td><td id = 'scores'>" + 0 + "</td></tr>";

	$("#score-table").html(table);
}

function subscribeGame(){
	roomStomp = stompClient.subscribe('/broker/room/' + room, function (hangman) {

		if(JSON.parse(hangman.body).guess == JSON.parse(hangman.body).word){
			$('.letter-button').prop("disabled", true);
			setTimeout(function() {
				endGame(JSON.parse(hangman.body).attempts);
			}, 2000);		
		}

		if(JSON.parse(hangman.body).letter == null)
			startGame();

		play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
	});
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