package org.webskey.hangman.gameengine;

import java.util.Scanner;

public class Game {

	public static void main(String[] args) {

		String word = "ANANAS";
		char[] tab = word.toCharArray();		
		char[] guessed = new char[word.length()];
		
		for(int i = 0; i < tab.length; i++)
			guessed[i] = '_';

		char guess;
		int attempts = 5;

		Scanner sc = new Scanner(System.in);
		
		while(attempts > 0) {
			boolean flag = true;
			for(int i = 0; i < tab.length; i++)
				if(tab[i] != guessed[i])
					flag = false;
			if(flag) {
				System.out.println("WYGRALES");
				break;
			}
			System.out.println(guessed);
			System.out.print("Podaj char: ");			
			guess = sc.next().toUpperCase().charAt(0);

			if(word.contains(String.valueOf(guess))) {
				System.out.println("jest");
				for(int i = 0; i < tab.length; i++)
					if(tab[i] == guess)
						guessed[i] = tab[i];
			} else {
				attempts--;
				System.out.println("Nie ma. Pozostalo prob " + attempts);				
			}
		}
		
		if(attempts == 0)
			System.out.println("Przegrales");
		sc.close();
	}
}
