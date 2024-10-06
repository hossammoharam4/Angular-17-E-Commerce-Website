import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersURL = 'http://localhost:3300/users';
  private isLoggedIn = false;
  private isAdmin = false;

  constructor() {}

  // Register a new user
  // async registerUser(username: string, password: string): Promise<boolean> {
  //   const data = await fetch(this.usersURL);
  //   const usersData = await data.json();
  //   const users = usersData ?? [];

  //   const userExists = users.some((user: any) => user.username === username);

  //   if (!userExists) {
  //     const newUser = {
  //       id: (users.length + 1).toString(),
  //       username,
  //       password,
  //       isadmin: 0, // Default new user to non-admin
  //     };

  //     await fetch(this.usersURL, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ users: [...users, newUser] }),
  //     });

  //     return true;
  //   }

  //   return false;
  // }

  // Register a new user
  async registerUser(username: string, password: string): Promise<boolean> {
    const data = await fetch(this.usersURL);
    const usersData = await data.json(); // Fetch the entire JSON object
    const users = usersData ?? []; // Extract the users array
 
    // Check if the username already exists
    const userExists = users.some((user: any) => user.username === username);
 
    if (!userExists) {
      const newUser = {
        id: (users.length + 1).toString(), // Ensure the ID is a string
        username,
        password
      };
 
      // Use POST to add the new user to the JSON file
      await fetch(this.usersURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser) // Send only the new user data
      });
 
      return true; // Registration successful
    }
 
    return false; // Username already exists
  }

  // Login a user and determine if the user is an admin
  async loginUser(username: string, password: string): Promise<boolean> {
    const data = await fetch(this.usersURL);
    const usersData = await data.json();
    const users = usersData ?? [];

    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (user) {
      this.isLoggedIn = true;
      this.isAdmin = user.isadmin === 1;
      return true;
    }

    return false;
  }

  // Check if the current user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Check if the current user is an admin
  isUserAdmin(): boolean {
    return this.isAdmin;
  }

  // Log out the user
  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
