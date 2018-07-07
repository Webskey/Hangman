package org.webskey.hangman.model;

import lombok.Data;

@Data
public class User {
	private String username;
	private int room;
	
	public User() {}
	public User(String username) {
		this.username = username;
	}
	public User(String username, int room) {
		this.username = username;
		this.room = room;
	}
}
