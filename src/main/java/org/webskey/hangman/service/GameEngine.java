package org.webskey.hangman.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webskey.hangman.model.Hangman;

@Service
public class GameEngine {

	@Autowired
	private Hangman hangman;

	public Hangman setGame(String word) {
		hangman.setWord(word.toUpperCase());
		setGuess(word);
		hangman.setAttempts(6);
		hangman.setLetter(null);
		return hangman;
	}

	public void setGuess(String word) {
		hangman.setGuess(word.toUpperCase().chars().mapToObj(c -> {
			if(c < 64 || c > 88)
				return String.valueOf((char)c);
			else
				return "_";}).collect(Collectors.joining()));
	}

	public Hangman play(String letter) {
		hangman.setLetter(letter);
		if(hangman.getWord().contains(letter)) {
			hangman.setGuess(replace(hangman.getWord(), hangman.getGuess(), letter));		
		} else {
			hangman.setAttempts(hangman.getAttempts() - 1);						
		}

		if(hangman.getAttempts() < 1) {
			hangman.setGuess(hangman.getWord());
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
