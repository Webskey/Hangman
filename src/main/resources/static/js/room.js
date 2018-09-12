function roomManagment(usermap){
	var usrmap = JSON.parse(usermap.body);

	for (var [key, value] of usersmap){
		if(key == room){
			if(value != usrmap[key].length)
				newScoreboard(usrmap);

			if(value > usrmap[key].length){
				alert("Player left room.");
				$("#player2").hide();
				$('#setWord-btn').attr("disabled", true);
				$("#game").hide();
				player1();
			}

			if(value < usrmap[key].length && usrmap[key].length > 1 && player == 1){
				alert("New player joined this room.");
			}
			
			if(value < usrmap[key].length && usrmap[key].length > 1){
				$('#setWord-btn').attr("disabled", false);
			}
		}

		usersmap.set(key, usrmap[key].length);

		if(usrmap[key].length > 2)
			$('#room' + key).prop("disabled", true);
		else
			$('#room' + key).prop("disabled", false);
	}	
}

function joinRoom(num){
	stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': num, 'prevRoom': room}));
	room = num;

	if(usersmap.get(num) == 0){
		player1();
		$('#setWord-btn').attr("disabled", true);
	}else{
		player2();
	}

	$("#room-nr-info").text('Room nr : ' + room);
	$("#lobby-div").hide();	
	$("#room-div").show();

	connectChat($("#username").val());
	subscribeGame();
}

function exitRoom(){
	stompClient.send("/receiver/usermap", {}, JSON.stringify({'username': $("#username").val(), 'room': 0, 'prevRoom': room}));
	room = 0;
	player = null;

	roomStomp.unsubscribe();

	$("#game-div").hide();
	$("#room-div").hide();
	$("#lobby-div").show();
	$("#player1").hide();
	$("#player2").hide();
}