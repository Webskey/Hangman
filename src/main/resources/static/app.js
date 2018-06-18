var stompClient = null;

function setConnected(connected) {
	$("#connect").prop("disabled", connected);	
}

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function (frame) {
		setConnected(true);
		console.log('Connected: ' + frame);
		stompClient.subscribe('/broker/conversation', function (hangman) {
			onMessage(JSON.parse(hangman.body).letter);
		});
	});
}

function onMessage(letter) {	
	console.log("Choosen letter : " + letter);	
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
	stompClient.send("/receiver/message", {}, JSON.stringify({'letter': value}));
}