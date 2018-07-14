<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<title>Hangman</title>
<link href='https://fonts.googleapis.com/css?family=Chela One'
	rel='stylesheet'>
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
		<img alt="logo"
			src="http://11points.com/wp-content/uploads/2012/09/dominatehangman-1600.jpg"
			width='90%'>
		<form id='connect'>
			<input id="username" class="form-control" type="text" pattern=".{2,}"
				title=" 2-15 characters" maxlength="15" autocomplete="off"
				placeholder="Enter your name..." width='100%' autofocus required><br>
			<button id="connect-btn" class="btn btn-default" type="submit">
				Play</button>
		</form>
	</div>

	<div id="lobby" class="lobby">
		<button id="room1" class="btn btn-default btn-room"
			onclick="joinRoom(1)">ROOM 1</button>
		<button id="room2" class="btn btn-default btn-room"
			onclick="joinRoom(2)">ROOM 2</button>
		<button id="room3" class="btn btn-default btn-room"
			onclick="joinRoom(3)">ROOM 3</button>
		<button id="room4" class="btn btn-default btn-room"
			onclick="joinRoom(4)">ROOM 4</button>
	</div>

	<div id="game-div">
		<button id="exit-room-btn" class="btn btn-default"
			onclick="exitRoom()">Exit room</button>
		<span id="room-nr-info"> Room nr</span>

		<div id="game" class="container">
			<span id="guess"></span>
			<h2 id="attempts"></h2>
			<div id="letters">
				<c:forTokens
					items="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,Y,X,Z"
					delims="," var="name">
					<button id="${name}" class="btn btn-default letter-button"
						onclick="letterClicked(this.value)" value="${name}">${name}</button>
				</c:forTokens>
			</div>

			<img class="game-progress" id="0-attempts" alt="0 attempts"
				src="https://i.imgur.com/eLEY6Yq.jpg"> <img
				class="game-progress" id="1-attempts" alt="1 attempts"
				src="https://i.imgur.com/cuvQJTl.jpg"> <img
				class="game-progress" id="2-attempts" alt="2 attempts"
				src="https://i.imgur.com/lVjccV7.jpg"> <img
				class="game-progress" id="3-attempts" alt="3 attempts"
				src="https://i.imgur.com/UrPZckR.jpg"> <img
				class="game-progress" id="4-attempts" alt="4 attempts"
				src="https://i.imgur.com/LP6a3Zm.jpg"> <img
				class="game-progress" id="5-attempts" alt="5 attempts"
				src="https://i.imgur.com/W8BSPxC.jpg"> <img
				class="game-progress" id="6-attempts" alt="6 attempts"
				src="https://i.imgur.com/JXWiWE4.jpg">
		</div>

		<div id="player1" class="container">
			<form id="setWord">
				<input id="word" class="form-control" type="text" autocomplete="off"
					pattern=".{2,}" title=" 2-15 characters" maxlength="15"
					placeholder="Word to guess..." required>
				<button class="btn btn-default" type="submit">Start game</button>
			</form>
		</div>

		<div id="player2" class="container">
			<p>Waiting for other player to come up with the word to guess.</p>
		</div>

		<div id="win" class="result">
			<div id='winner'>winner SCORES!</div>
			<img id='win-img'
				src="https://cdn.dribbble.com/users/731566/screenshots/3187347/winner.gif">
		</div>

		<div id="score">
			<span id="player"></span><br>
			<table id="score-table">
				<tr>
					<td id='p1-name'>P1</td>
					<td id='p1-score'>Score p1</td>
				</tr>
				<tr>
					<td id='p2-name'>P2</td>
					<td id='p2-score'>Score p2</td>
				</tr>
			</table>
		</div>
	</div>
	<div id="online"></div>
</body>