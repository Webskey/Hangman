var stompClient = null;
var room = 0;
var players = null;
var inRoom = false;
var player = null;
var room1 = 0;
var room2 = 0;
var room3 = 0;
var room4 = 0;
var word = null;

function connect() {
	var socket = new SockJS('/websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function (frame) {
		setConnected();
		console.log("Connected to Websocket");

		stompClient.subscribe('/broker/fill-usermap', function (usermap) {	
			console.log(usermap);

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

function checkPlayers(){
	stompClient.send("/receiver/create-usermap", {});	
}

function roomManagment(usermap){
	var usrmap = JSON.parse(usermap.body);
	console.log(usrmap[0]);

	for (var i = 1; i < 5; i++) {
		console.log("pokoj " + i + ": " + usrmap[i]);
		eval('room' + i + '= usrmap[' + i + '];');
		if(usrmap[i] > 2){
			$('#room' + i).prop("disabled", true);
		}else{
			$('#room' + i).prop("disabled", false);
		}
	}
	/*console.log(usrmap[1]);
	room1 = usrmap[1];
	if(usrmap[1] > 2){
		$('#room1').prop("disabled", true);
	}else{
		$('#room1').prop("disabled", false);
	}

	console.log(usrmap[2]);
	room2 = usrmap[2];
	if(usrmap[2] > 2){
		$('#room2').prop("disabled", true);
	}else{
		$('#room2').prop("disabled", false);
	}

	console.log(usrmap[3]);
	room3 = usrmap[3];
	if(usrmap[3] > 2){
		$('#room3').prop("disabled", true);
	}else{
		$('#room3').prop("disabled", false);
	}

	console.log(usrmap[4]);
	room4 = usrmap[4];
	if(usrmap[4] > 2){
		$('#room4').prop("disabled", true);
	}else{
		$('#room4').prop("disabled", false);
	}*/
}

function joinRoom(num){
	room = num;
	console.log("joining room" + num);
	stompClient.send("/receiver/create-usermap", {});

	var oki = eval('room' + num);	
	if(oki == 0){
		player1();
	}else{
		player2();
	}
	$("#lobby").hide();	

	//setTimeout(function() {
	//	console.log("Players : " + players);
	//	if(!inRoom)
	//		checku(players);
	//	$("#loading-gif").hide();
	//}, 3000);
}

function setConnected() {	
	$("#welcome").hide();
	$("#lobby").show();
	$("#online").show();
	$("#online").append($("#username").val());
}

function checkFull(num){
	room = num;
	players = 0;

	room1 = stompClient.subscribe('/broker/room/' + num, function (hangman) {
		if(JSON.parse(hangman.body).hello === undefined){
			if(JSON.parse(hangman.body).guess == JSON.parse(hangman.body).word){
				$('.letter-button').prop("disabled", true);

				setTimeout(function() {
					endGame(JSON.parse(hangman.body).attempts);
				}, 2000);		
			}
			play(JSON.parse(hangman.body).letter, JSON.parse(hangman.body).guess, JSON.parse(hangman.body).attempts);
		}else{
			console.log("Sending to sayingHello");
			stompClient.send("/receiver/room/" + num + '/sayingHello', {});
		}
	});

	room2 = stompClient.subscribe('/receiver/room/' + num, function (hangman) {		
		console.log("Subscribbed room nr: " + room);
		$("#room-nr-info").text("Room " + room);
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
		$(".btn-room").hide();	
		$("#full-room").css("display", "block");
		setTimeout(function() {
			$(".btn-room").show();
			$("#full-room").css("display", "none");
		}, 1500);
		exitRoom();
	}
}

function exitRoom(){
	console.log("Leaving room " + room);
	stompClient.send("/receiver/create-usermap", {});
	inRoom = false;
	room = 0;
	players = 0;
	player = null;
	
	/*room1.unsubscribe();
	room2.unsubscribe();
	room3.unsubscribe();
	room4.unsubscribe();
	*/
	$("#game-div").hide();
	$("#lobby").show();
	$("#player1").hide();
	$("#player2").hide();
	
}

function player1(){
	//room2.unsubscribe();
	//room3.unsubscribe();
	player = 1;
	inRoom = true;
	$("#lobby").hide();		
	$("#game-div").show();	
	$("#player1").show();	
	//$('.letter-button').prop("disabled", true);
}

function player2(){
	console.log("Player2");
	player = 2;
	inRoom = true;
	//room2.unsubscribe();
	//room3.unsubscribe();
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