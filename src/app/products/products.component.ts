import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../shared/models/Product';
import { ProductServices } from '../services/products/products.services';
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  pruductArr: Product[] = [];
  searchQuery: string = '';
  filteredProducts: Product[] = [];

  constructor(
    private productServices: ProductServices,
    private cartservice: CartService,
    private router: Router
  ) {
    this.loadAllProducts();
  }

  private loadAllProducts() {
    this.productServices.getAllProducts().then((productList: Product[]) => {
      this.pruductArr = productList;
    });
  }

  addCartItem(product: Product) {
    this.cartservice.addToCart(product);
  }

  searchProducts() {
    if (this.searchQuery) {
      this.productServices.searchProducts(this.searchQuery).then((result: Product[]) => {
        this.pruductArr = result;
      });
    } else {
      this.loadAllProducts();
    }
  }

  // Method to search products
  // searchProducts() {
  //   const query = this.searchQuery.toLowerCase();
  //   this.filteredProducts = this.pruductArr.filter(product =>
  //     product.title.toLowerCase().includes(query)
  //   );
  // }

  // selectProduct(product: Product) {
  //   this.searchQuery = product.title;
  //   this.filteredProducts = []; // Clear the dropdown after selection
  //   // Optionally navigate to the product details page
  //   this.router.navigate(['/product', product.id]);
  // }
}
