function connectChat(username){
	$("#chat-div").show();
	$("#chat").attr('src',"https://webskey-websocket-chat.herokuapp.com/?name=" + username + "&room=" + room);
}