import { Component } from '@angular/core';
import { AuthService } from '../services/authservice/Auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  async login() {
    const isLoggedIn = await this.authService.loginUser(this.username, this.password);

    if (isLoggedIn) {
      console.log("login succes")
      this.router.navigate(['/']); // <--- Redirect to /dashboard page
      // Redirect to a different page or show success message
    } else {
      this.loginError = 'Invalid Username Or Password'
      // Show error message
    }
  }
}