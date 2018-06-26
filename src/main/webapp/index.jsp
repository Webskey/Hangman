<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<title>Hangman</title>
<link rel="shortcut icon" type="image/png"
	href="https://png.icons8.com/windows/1600/suicide-risk.png" />
<link href="/webjars/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="/style.css" rel="stylesheet">
<script src="/webjars/jquery/jquery.min.js"></script>
<script src="/webjars/sockjs-client/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/stomp.min.js"></script>
<script src="/main.js"></script>
<script src="/game.js"></script>
<meta charset="utf-8">
</head>
<body>
	<div id="welcome">
		<img alt="logo" src="https://i.imgur.com/xpVvAsF.png">
		<input id="username" class="form-control" type="text">
		<button id="connect" class="btn btn-default" type="submit">
			Play</button>
	</div>

	<div id="lobby" class="container">
		<button id="room1" class="btn btn-default btn-room"
			onclick="checkFull(1)">ROOM 1</button>
		<button id="room2" class="btn btn-default btn-room"
			onclick="checkFull(2)">ROOM 2</button>
		<button id="room3" class="btn btn-default btn-room"
			onclick="checkFull(3)">ROOM 3</button>
		<button id="room4" class="btn btn-default btn-room"
			onclick="checkFull(4)">ROOM 4</button>
	</div>

	<div id="loading-gif" class="container">
		<img
			src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">
	</div>

	<div id="game" class="container">
		<h1 id="guess"></h1>
		<h1 id="attempts"></h1>
		<div id="letters">
			<c:forTokens items="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,U,W,Y,X,Z"
				delims="," var="name">
				<button id="${name}" class="btn btn-default letter-button"
					onclick="letterClicked(this.value)" value="${name}">${name}</button>
			</c:forTokens>
		</div>
		<img class="game-progress" id="6" alt="6 attempts" src="https://i.imgur.com/hPIAd0v.jpg">
		<img class="game-progress" id="5" alt="5 attempts" src="https://i.imgur.com/al7tyZy.jpg">
		<img class="game-progress" id="4" alt="4 attempts" src="https://i.imgur.com/LQFFoAg.jpg">
		<img class="game-progress" id="3" alt="3 attempts" src="https://i.imgur.com/65SbgvI.jpg">
		<img class="game-progress" id="2" alt="2 attempts" src="https://i.imgur.com/VNdvjRS.jpg">
		<img class="game-progress" id="1" alt="1 attempts" src="https://i.imgur.com/f81kmy8.jpg">
		<img class="game-progress" id="0" alt="0 attempts" src="https://i.imgur.com/rUN2hyN.jpg">
		<button id="exit-room" class="btn btn-default" onclick="exitRoom()">
			Exit room</button>
	</div>

	<div id="player1" class="container">
		<input id="word" class="form-control" type="text" autocomplete="off"
			placeholder="Word to guess...">
		<button id="setWord" class="btn btn-default" onclick="setWord()">
			Start game</button>
	</div>

	<div id="player2" class="container">
		<p>Waiting for other player to come up with the word to guess.</p>
	</div>

	<div id="win" class="container">
		<img
			src="https://cdn.dribbble.com/users/731566/screenshots/3187347/winner.gif"
			width="300">
	</div>
	<div id="lost" class="container">
		<img
			src="http://gifimage.net/wp-content/uploads/2017/07/game-over-gif-13.gif"
			width="300">
	</div>
</body>