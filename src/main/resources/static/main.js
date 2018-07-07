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

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected();
		console.log("Connected to Websocket");

		stompClient.subscribe('/broker/fill-usermap', function (usermap) {	
			console.log(usermap);
			userMap = usermap;
			roomManagment(usermap);
		});
		stompClient.subscribe('/broker/create-usermap', function (hangman) {	
			console.log("Sending info about me: " + $("#username").val() + " room: " + room);
			stompClient.send("/receiver/fill-usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': room}));	
		});

		stompClient.send("/receiver/create-usermap", {});	

	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function setConnected() {	
	$("#welcome").hide();
	$("#lobby").show();
	$("#online").show();
	$("#online").append($("#username").val());
}

function checkPlayers(){
	stompClient.send("/receiver/create-usermap", {});	
}

function roomManagment(usermap){
	var usrmap = JSON.parse(usermap.body);
	console.log(usrmap[0].length);
	for (var i = 1; i < 5; i++) {
		console.log("pokoj " + i + ": " + usrmap[i].length);

		//checking players activity
		if(i == room){
			var numOfPlayers =  eval('room' + i);
			if(numOfPlayers  == usrmap[i].length){}
			if(numOfPlayers  > usrmap[i].length){
				console.log("some1 left");
			}
			if(numOfPlayers  < usrmap[i].length){
				console.log("some1 joined");
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

function joinRoom(num){
	room = num;
	$("#room-nr-info").text('Room nr : ' + room);
	console.log("joining room" + num);
	stompClient.send("/receiver/create-usermap", {});

	var playersAmount = eval('room' + num);	
	if(playersAmount == 0){
		player1();
	}else{
		player2();
	}

	$("#lobby").hide();	

	roomStomp = stompClient.subscribe('/broker/room/' + num, function (hangman) {
		if(JSON.parse(hangman.body).guess == JSON.parse(hangman.body).word){
			$('.letter-button').prop("disabled", true);
			setTimeout(function() {
				endGame(JSON.parse(hangman.body).attempts);
			}, 2000);		
		}
		play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
	});
}

function exitRoom(){
	console.log("Leaving room " + room);
	stompClient.send("/receiver/create-usermap", {});
	room = 0;
	player = null;

	roomStomp.unsubscribe();

	$("#game-div").hide();
	$("#lobby").show();
	$("#player1").hide();
	$("#player2").hide();
}

function player1(){
	player = 1;
	$("#player").text(player);	
	$("#lobby").hide();		
	$("#game-div").show();	
	$("#player1").show();	
	//$('.letter-button').prop("disabled", true);
}

function player2(){
	player = 2;
	$("#player").text(player);
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