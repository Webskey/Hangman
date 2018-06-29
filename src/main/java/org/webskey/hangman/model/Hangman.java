package org.webskey.hangman.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class Hangman {
	
	private String word;
	private int attempts;
	private String letter;
	private String guess;
	
	public Hangman() {}
	public Hangman(String letter) {
		this.letter = letter;
	}
}
