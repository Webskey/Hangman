package org.webskey.hangman.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webskey.hangman.gameengine.Hangman;

@Service
public class Servvice {
	
	@Autowired
	private Hangman hangman;
	
	public int getAttempts() {
		hangman.setAttempts(5);
		return hangman.getAttempts();
	}
	
	public String getWord() {
		hangman.setWord("Apple");
		return hangman.getWord().toUpperCase();
	}
	
	public String getGuess() {
		String s = "";
		for(int i = 0; i < hangman.getWord().length(); i++)
			s += String.join(" e", "_", s);
		return s;
	}
}
