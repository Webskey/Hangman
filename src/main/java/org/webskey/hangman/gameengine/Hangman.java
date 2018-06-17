package org.webskey.hangman.gameengine;

import org.springframework.stereotype.Component;

@Component
public class Hangman {
	
	private String word;
	private int attempts;
	
	public void setWord(String word) {
		this.word = word;
	}
	
	public String getWord() {
		return word;
	}
	
	public void setAttempts(int attempts) {
		this.attempts = attempts;
	}
	
	public int getAttempts() {
		return attempts;
	}
	
	public boolean isLetter(char letter) {
		return word.contains(String.valueOf(letter));
	}
	
	
}
