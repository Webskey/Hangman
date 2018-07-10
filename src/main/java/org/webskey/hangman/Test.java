package org.webskey.hangman;

import java.util.ArrayList;
import java.util.HashMap;

import org.webskey.hangman.model.User;

public class Test {

	static HashMap<Integer, ArrayList<User>> location;
	
	public static void users(User user) {
		location.get(user.getRoom()).add(user);
		//location.put(user.getRoom(), user);
	}
	
	public static void main(String[] args) {
		 location = new HashMap<>();
		for(int i = 0; i < 5; i++)
			location.put(i, new ArrayList<>());
		
		System.out.println(location);
		
		User user1 = new User("Janek", 2);
		User user2 = new User("Waldek", 2);
		User user3 = new User("Rysio", 3);
		User user4 = new User("Dyzio", 4);
		
		users(user1);
		
		users(user2);
		users(user3);
		users(user4);
		System.out.println(location);
		location.get(user1.getRoom()).remove(user1);
		System.out.println(location);
	}

}
