import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/authservice/Auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationSuccess: boolean = false;
  registrationError: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'Passwords do not match';
      return;
    }

    const isRegistered = await this.authService.registerUser(this.username, this.password,);

    if (isRegistered) {
      this.registrationSuccess = true;
      this.registrationError = '';
      console.log('Registration successful');
      // Optionally redirect to login page or show success message
    } else {
      this.registrationSuccess = false;
      this.registrationError = 'Username already exists';
      console.log('Registration failed');
}
}
}