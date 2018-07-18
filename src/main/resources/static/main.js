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

		stompClient.subscribe('/broker/fill-usermap', function (usermap) {	
			/*console.log(usermap);*/
			userMap = JSON.parse(usermap.body);
			roomManagment(usermap);
		});
		stompClient.subscribe('/broker/create-usermap', function (hangman) {	
			/*console.log("Sending info about me: " + $("#username").val() + " room: " + room);*/
			stompClient.send("/receiver/fill-usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': room, 'pIndex': pIndex}));	
		});

		stompClient.send("/receiver/create-usermap", {});	

	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function setConnected() {	
	$("#welcome").hide();
	$("#lobby").show();
	connectChat($("#username").val());
}

function checkPlayers(){
	stompClient.send("/receiver/create-usermap", {});	
}

function roomManagment(usermap){
	var usrmap = JSON.parse(usermap.body);
	/*console.log(usrmap[0].length);*/
	for (var i = 1; i < 5; i++) {
		/*console.log("pokoj " + i + ": " + usrmap[i].length);*/

		//checking players activity
		if(i == room){
			var numOfPlayers =  eval('room' + i);
			if(numOfPlayers  != usrmap[i].length){
				newScoreboard();
			}
			if(numOfPlayers  > usrmap[i].length){
				console.log("some1 left room");	
				$("#player2").hide();
				$('#setWord').attr("disabled", true);
				$("#game").hide();
				player1();
			}
			if(numOfPlayers  < usrmap[i].length && usrmap[i].length > 1){
				console.log("some1 joined room");
				$('#setWord').attr("disabled", false);
			}
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
	console.log("lunght" + userMap[room].length);
	for(var i = 0; i < userMap[room].length; i ++){
		//table += "<tr><td id = 'p" + (i+1) + "-name'>" + userMap[room][i].username + "</td><td id = 'p" + (i+1) + "-score'>" + 0 + "</td></tr>";
		table += "<tr id = '" + userMap[room][i].username + "'><td id = 'name'>" + userMap[room][i].username + "</td><td id = 'scores'>" + 0 + "</td></tr>";
	}
	console.log("TABLE: " + table);
	$("#score-table").html(table);
}

function joinRoom(num){
	console.log("joining room" + num);
	stompClient.send("/receiver/fill-usermap/changeRoom", {}, JSON.stringify({'username': $("#username").val(), 'room': num, 'prevRoom': room, 'pIndex': pIndex}));
	room = num;

	$("#room-nr-info").text('Room nr : ' + room);

	var playersAmount = eval('room' + num);
	//player1();
	if(playersAmount == 0){
		pIndex = 1;
		player1();
		//$('#setWord').attr("disabled", true);
	}else{
		pIndex = 2
		player2();
	}

	$("#lobby").hide();	
	$("#game-div").show();

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
	stompClient.send("/receiver/fill-usermap/changeRoom", {}, JSON.stringify({'username': $("#username").val(), 'room': 0, 'prevRoom': room, 'pIndex': pIndex}));
	room = 0;
	player = null;

	roomStomp.unsubscribe();

	$("#game").hide();
	$("#game-div").hide();
	$("#lobby").show();
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
	/*$("form").on('submit', function (e) {
		e.preventDefault();
	});*/
	$("#connect").on('submit', function (e) {
		e.preventDefault();
		connect();
	});
	$("#setWord").on('submit', function (e) {
		e.preventDefault();
		setWord();
	});
	//$( "#connect" ).click(function() { connect(); });
	//$( "#setWord" ).click(function() { setWord(); });
});