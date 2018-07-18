package org.webskey.hangman;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

import org.webskey.hangman.model.User;

public class Test {

	static HashMap<Integer, ArrayList<User>> location;
	
	public static void users(User user) {
		location.get(user.getRoom()).add(user);
		//location.put(user.getRoom(), user);
	}
	
	public static void main(String[] args) {
		String word = "abcdefghijklmnoprstuqwxyz   No wy!?[] {}-=!@#$%^&*() Y ork ss ie bile";
		String newWord = word.toUpperCase().chars().mapToObj(c -> {
			if(c < 64 || c > 90)
				return String.valueOf((char)c);
			else
				return "_";}).collect(Collectors.joining());
		
		System.out.println(newWord);
	}

}
