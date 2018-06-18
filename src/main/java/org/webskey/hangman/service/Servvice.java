package org.webskey.hangman.service;

import java.util.stream.Collectors;
import java.util.stream.Stream;

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
		hangman.setWord("Apple".toUpperCase());
		return hangman.getWord().toUpperCase();
	}

	public String getGuess(String word) {
		hangman.setGuess(String.join(" ", word.chars().mapToObj(c -> "_").collect(Collectors.toList())));
		return hangman.getGuess();
	}

	public Hangman play(String letter) {
		hangman.setLetter(letter);
		if(hangman.getWord().contains(letter)) {
			hangman.setGuess(replace(hangman.getWord(), hangman.getGuess(), letter));			
		} else {
			hangman.setAttempts(hangman.getAttempts() - 1);						
		}
		System.out.println("Guess " + hangman.getGuess());
		return hangman;
	}

	public String replace(String word, String guess, String letter) {
		char[] wordA = word.toCharArray();		
		char[] guessA = guess.replaceAll(" ", "").toCharArray();		
		for(int i = 0; i < wordA.length; i++)
			if(String.valueOf(wordA[i]).equalsIgnoreCase(letter))
				guessA[i] = wordA[i];
		System.out.println(guessA);
		return Stream.of(guessA).map(x -> String.valueOf(x)).collect(Collectors.joining(" "));
	}
}
