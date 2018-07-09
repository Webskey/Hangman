package org.webskey.hangman.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.webskey.hangman.model.Hangman;
import org.webskey.hangman.model.User;
import org.webskey.hangman.service.GameEngine;

@Controller
public class Controler {

	@Autowired
	private GameEngine gameService;
	
	private HashMap<Integer, List<User>> location;

	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@MessageMapping("/room/{num}/setWord")
	@SendTo("/broker/room/{num}")
	public Hangman setGame(Hangman hangman) throws Exception {		
		return gameService.setGame(hangman.getWord());
	}

	@MessageMapping("/room/{num}")
	@SendTo("/broker/room/{num}")
	public Hangman play(Hangman hangman) throws Exception {			
		return gameService.play(hangman.getLetter());
	}
	
	@MessageMapping("/create-usermap")
	@SendTo("/broker/create-usermap")
	public Map<Integer, List<User>> createUserMap() throws Exception {	
		location = new HashMap<>();
		for(int i = 0; i < 5; i++)
		location.put(i, new ArrayList<>());
		return location;
	}
	
	@MessageMapping("/fill-usermap")
	@SendTo("/broker/fill-usermap")
	public Map<Integer, List<User>> fillUserMap(User user) throws Exception {	
		location.get(user.getRoom()).add(user);
		User kuser = new User("ZABYTEK", 2);
		location.get(kuser.getRoom()).add(kuser);
		return location;
	}
}
