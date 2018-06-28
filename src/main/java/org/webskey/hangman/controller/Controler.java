package org.webskey.hangman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.webskey.hangman.model.Hangman;
import org.webskey.hangman.model.Hello;
import org.webskey.hangman.service.Servvice;

@Controller
public class Controler {

	@Autowired
	private Servvice service;

	@RequestMapping("/")
	public String index(Model model) {
		return "index";
	}
	
	@MessageMapping("/room/{num}/canIjoin")
	@SendTo("/broker/room/{num}")
	public Hello checkingFull() throws Exception {		
		return new Hello("Imhere");
	}
	
	@MessageMapping("/room/{num}/sayingHello")
	@SendTo("/broker/room/{num}/players")
	public Hello checking2Full() throws Exception {		
		return new Hello("Imhere");
	}
	
	@MessageMapping("/room/{num}/setWord")
	@SendTo("/broker/room/{num}/game")
	public Hangman setWord(Hangman hangman) throws Exception {		
		return service.setWord(hangman.getWord());
	}

	@SubscribeMapping("/room/{num}")
	public Hello subscribingRoom() {
		return new Hello("Saying Hello");
	}

	@MessageMapping("/users")
	@SendTo("/broker/main")
	public Hangman messageReceived(Hangman username)throws Exception {				
		return username;
	}

	@MessageMapping("/room/{num}")
	@SendTo("/broker/room/{num}")
	public Hangman room(Hangman hangman) throws Exception {			
		return service.play(hangman.getLetter());
	}
}
