var stompClient = null;
var room = null;
var rooms = [0, 0, 0, 0];

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	if (connected) {
		//$("#game").show();
		$("#welcome").hide();
		$("#lobby").show();
	}
	else {
		$("#game").hide();		
		$("#welcome").show();
	}
}

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected(true);
		console.log("Connected to Websocket");
		stompClient.subscribe('/broker/main', function (hangman) {					
			if(JSON.parse(hangman.body).attempts < 1)
				console.log("Jest mniejsze");
		});
		//addUser();
	},function(message) {
		console.log("Disconnected from WebSocket");
	});
}

function addUser(){
	var u = JSON.stringify({'name': $("#username").val()});
	console.log("USERNAM!: " + u);
	stompClient.send("/receiver/users", {}, JSON.stringify({'word': $("#username").val()}));
}

function onMessage(letter, guess, attempts) {	
	console.log("Choosen letter : " + letter);	
	$('#guess').text(guess);
	$('#attempts').text(attempts);
}

function joinRoom(num){
	$("#game").show();
	$("#lobby").hide();
	room = num;
	rooms[num-1] = rooms[num-1] + 1;
	console.log("Joined room nr: " + num);
	
	//players(rooms[num-1]);
	stompClient.send("/receiver/users", {}, JSON.stringify({'attempts': 1}));
	
	stompClient.subscribe('/broker/room/' + num, function (hangman) {		
		onMessage(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		console.log("inside /broker/room");
	});
	
	stompClient.subscribe('/receiver/room/' + num, function (hangman) {		
		console.log("inside /receiver/room");
	});
}

//function players(num){
	//if(rooms[num-1] == 1)playerOne; waitForOtherPlayerMessage;
	//if(rooms[num-1] == 2)
		//playerTwo;
		//$.disabled = true;
		//startGame;
//}

$(function () {
	$("form").on('submit', function (e) {
		e.preventDefault();
	});
	$( "#connect" ).click(function() { connect(); });
});

function letterClicked(value) {	
	var id = "#"+value;
	$(id).prop("disabled", true);
	console.log('Clicked: '+ value);	
	stompClient.send("/receiver/room/" + room, {}, JSON.stringify({'letter': value}));
}