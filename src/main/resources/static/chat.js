function connectChat(username){
	$("#chat").show();
	$("#chat").attr('src',"https://webskey-websocket-chat.herokuapp.com/?name=" + username);
}