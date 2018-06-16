package org.webskey.hangman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Controler {
	
	@RequestMapping("/")
	public String index() {  
		return "index";
	}
}
