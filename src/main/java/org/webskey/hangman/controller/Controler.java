package org.webskey.hangman.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
		location = new HashMap<>();
		for(int i = 0; i < 5; i++)
			location.put(i, new ArrayList<>());
		return "index";
	}

	@MessageMapping("/room/{num}/setWord")
	@SendTo("/broker/room/{num}")
	public Hangman setGame(Hangman hangman) throws Exception {	
		gameService.setGame(hangman.getWord());
		return gameService.getHangman();
	}

	@MessageMapping("/room/{num}")
	@SendTo("/broker/room/{num}")
	public Hangman play(Hangman hangman) throws Exception {	
		gameService.play(hangman.getLetter());
		return gameService.getHangman();
	}

	@MessageMapping("/usermap")
	@SendTo("/broker/usermap")
	public Map<Integer, List<User>> userMap(User user) throws Exception {	
		Optional.ofNullable(user.getPrevRoom()).ifPresent(x -> location.get(x).remove(user));
		location.get(user.getRoom()).add(user);
		return location;
	}
}
