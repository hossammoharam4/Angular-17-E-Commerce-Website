import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { AuthService } from '../services/authservice/Auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink , FormsModule , CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showAdminComponent(): boolean {
    return this.authService.isAuthenticated() && this.authService.isUserAdmin();
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout();
  }
  cart!: Cart;

  
  constructor(private cartservice: CartService , private authService :AuthService) {
    this.setCart();

  }

  setCart() {
    this.cart = this.cartservice.getCart();
  }
}
