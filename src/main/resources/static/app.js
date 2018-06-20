var stompClient = null;
var room = null;

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
	//stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected(true);
		stompClient.subscribe('/broker/main', function (hangman) {
			onMessage(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		});
	},function(message) {
		console.log("Disconnected from WebSocket");
	});
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
	console.log("Joined room nr: " + num);
	
	//if(entranceNum == 1)playerOne; waitForOtherPlayerMessage;	if(entranceNum == 2)playerTwo; disable join; startGame;
	stompClient.subscribe('/broker/room/' + num, function (hangman) {		
		onMessage(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
	});
}

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