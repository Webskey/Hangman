package org.webskey.hangman.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webskey.hangman.model.Hangman;

@Service
public class Servvice {

	@Autowired
	private Hangman hangman;

	public int getAttempts() {
		hangman.setAttempts(5);
		return hangman.getAttempts();
	}
	
	public Hangman setWord(String word) {
		hangman.setWord(word.toUpperCase());
		hangman.setGuess(hangman.getWord().chars().mapToObj(c -> "_").collect(Collectors.joining()));
		return hangman;
	}

	public Hangman play(String letter) {
		hangman.setLetter(letter);
		if(hangman.getWord().contains(letter)) {
			hangman.setGuess(replace(hangman.getWord(), hangman.getGuess(), letter));		
		} else {
			hangman.setAttempts(hangman.getAttempts() - 1);						
		}
		
		if(hangman.getWord().equalsIgnoreCase(hangman.getGuess())){
			hangman.setGuess("win");
		}
		
		if(hangman.getAttempts() < 1) {
			hangman.setGuess("lost");
		}
		return hangman;
	}

	public String replace(String word, String guess, String letter) {			
		StringBuilder sb = new StringBuilder(guess);		
		for(int i = 0; i < word.length(); i++)
			if(String.valueOf(word.charAt(i)).equalsIgnoreCase(letter))
				sb.setCharAt(i, word.charAt(i));
		return sb.toString();
	}
}
