package org.webskey.hangman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.webskey.hangman.service.Servvice;

@Controller
public class Controler {
	
	@Autowired
	Servvice service;
	
	@RequestMapping("/")
	public String index(Model model) {
		model.addAttribute("word", service.getWord());
		model.addAttribute("guess", service.getGuess());
		model.addAttribute("attempts", service.getAttempts());
		return "index";
	}
}
