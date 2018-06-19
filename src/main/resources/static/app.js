var stompClient = null;

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	if (connected) {
		$("#game").show();
		$("#welcome").hide()
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
		stompClient.subscribe('/broker/conversation', function (hangman) {
			onMessage(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		});
	});
}

function onMessage(letter, guess, attempts) {	
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

function letterClicked(value) {	
	var id = "#"+value;
	$(id).prop("disabled", true);
	console.log('Clicked: '+ value);	
	stompClient.send("/receiver/message", {}, JSON.stringify({'letter': value}));
}