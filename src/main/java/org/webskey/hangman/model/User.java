package org.webskey.hangman.model;

import lombok.Data;

@Data
public class User {
	private String username;
	private int room;
	private int prevRoom;
	private int pIndex;
	
	public User() {}
	public User(String username) {
		this.username = username;
	}
	public User(String username, int room) {
		this.username = username;
		this.room = room;
	}
	public User(String username, int room, int pIndex) {
		this.username = username;
		this.room = room;
		this.pIndex = pIndex;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}
}
