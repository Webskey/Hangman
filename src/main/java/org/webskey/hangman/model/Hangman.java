package org.webskey.hangman.model;

import org.springframework.stereotype.Component;

@Component
public class Hangman {
	
	private String word;
	private int attempts;
	private String letter;
	private String guess;
	
	public Hangman() {}
	public Hangman(String letter) {
		this.letter = letter;
	}
	
	public void setWord(String word) {
		this.word = word;
	}
	
	public String getWord() {
		return word;
	}
	
	public void setGuess(String guess) {
		this.guess = guess;
	}
	
	public String getGuess() {
		return guess;
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
	
	public void setLetter(String letter) {
		this.letter = letter;
	}
	
	public String getLetter() {
		return letter;
	}
	
}
