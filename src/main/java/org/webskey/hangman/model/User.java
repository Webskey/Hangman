package org.webskey.hangman.model;

import lombok.Data;

@Data
public class User {	
	private String username;
	private int room;
	private int prevRoom;
	private int pIndex;
}