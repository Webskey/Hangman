package org.webskey.hangman.model;

import lombok.Data;

@Data
public class User {
	private String username;
	private int room;
	
	public User() {}
	public User(String s) {
		username = s;
	}
}
