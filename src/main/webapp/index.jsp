<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<title>Hangman</title>
<link rel="shortcut icon" type="image/png"
	href="https://png.icons8.com/windows/1600/suicide-risk.png" />
<link href="/webjars/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="/main.css" rel="stylesheet">
<script src="/webjars/jquery/jquery.min.js"></script>
<script src="/webjars/sockjs-client/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/stomp.min.js"></script>
<meta charset="utf-8">
</head>
<body>

<h1>Hangman game.</h1>
<div id="letters">
<c:forTokens items = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,U,W,Y,X,Z" delims = "," var = "name">
               <button class="letter-button" type="button">${name}</button> 
      </c:forTokens>
</div>
</body>