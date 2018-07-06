package org.webskey.hangman.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.webskey.hangman.model.Hangman;
import org.webskey.hangman.model.User;
import org.webskey.hangman.service.GameEngine;

@Controller
public class Controler {

	@Autowired
	private GameEngine gameService;
	
	private HashMap<Integer, Integer> location;

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@MessageMapping("/room/{num}/canIjoin")
	@SendTo("/broker/room/{num}")
	public User checkingFull() throws Exception {		
		return new User("Imhere");
	}

	@MessageMapping("/room/{num}/sayingHello")
	@SendTo("/broker/room/{num}/players")
	public User checking2Full() throws Exception {		
		return new User("Imhere");
	}
	
	@MessageMapping("/room/{num}/setWord")
	@SendTo("/broker/room/{num}/game")
	public Hangman setWord(Hangman hangman) throws Exception {		
		return gameService.setGame(hangman.getWord());
	}

	@SubscribeMapping("/room/{num}")
	public User subscribingRoom() {
		return new User("Saying Hello");
	}

	@MessageMapping("/room/{num}")
	@SendTo("/broker/room/{num}")
	public Hangman room(Hangman hangman) throws Exception {			
		return gameService.play(hangman.getLetter());
	}
	
	// ====== NEW ! ===== //
	
	@MessageMapping("/create-usermap")
	@SendTo("/broker/create-usermap")
	public Map<Integer, Integer> createDistributionMap() throws Exception {	
		location = new HashMap<>();
		for(int i = 0; i < 5; i++)
		location.put(i, 0);
		return location;
	}
	
	@MessageMapping("/fill-usermap")
	@SendTo("/broker/fill-usermap")
	public Map<Integer, Integer> allocatePlayers(User user) throws Exception {	
		location.put(user.getRoom(), location.get(user.getRoom()) + 1);
		return location;
	}
}
