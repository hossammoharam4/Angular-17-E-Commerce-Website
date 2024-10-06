import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductServices } from '../services/products/products.services'; // Adjust the path as necessary
import { Product } from '../shared/models/Product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Optional: for styling
})
export class AdminComponent implements OnInit {
  // Form fields
  products: Product[] = [];
  title: string = '';
  description: string = '';
  Price = 0;
  color = "";
  discount : number = 0;
  photo: string = '';
  deleteMessage :string = "";

  // Feedback messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductServices) {}

  async ngOnInit() {
    this.products = await this.productService.getAllProducts();
  }

  // Method to handle form submission
  async addProduct() {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';

    // Basic validation
    if (!this.title || !this.description || this.Price === null || !this.photo) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    // Create the product object
    // const newProduct = {
    //   title: this.title,
    //   description: this.description,
    //   price: this.price,
    //   photo: this.photo
    // };

    // Call the service to add the product
    const isAdded = await this.productService.addNewProduct(this.title, this.description,this.Price,this.color,this.discount =this.Price + 100,this.photo);

    if (isAdded) {
      this.successMessage = 'Product added successfully!';
      // Clear form fields
      this.title = '';
      this.description = '';
      this.Price = 0;
      this.photo = '';
    } else {
      this.errorMessage = 'Failed to add product. Please try again.';
    }
  }

  // async deleteProduct() {
  //   if (this.title) {
  //     const isDeleted = await this.productService.deleteProductByTitle(this.title);
  //     if (isDeleted) {
  //       console.log('Product deleted successfully');
  //       // Optionally, reset the form or show success message
  //     } else {
  //       console.log('Product not found');
  //       // Optionally, show error message
  //     }
  //   }
  // }

  
  // async deleteProduct(title: string) {
  //   const success = await this.productService.deleteProductByTitle(this.title);
  //   if (success) {
  //     this.products = this.products.filter(product => product.title !== title); // Remove from the list
  //   }
  // }

  async deleteProduct(productId: string) {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';
  
    if (!productId) {
      this.errorMessage = 'Product ID is required to delete a product.';
      return;
    }
  
    try {
      // Call the service to delete the product
      await this.productService.deleteProduct(productId);
  
      this.successMessage = 'Product deleted successfully!';
      // You might want to refresh the list of products or handle the UI update after deletion
      // this.loadProducts(); // Assuming you have a method to load or refresh the product list
    } catch (error) {
      this.errorMessage = 'Failed to delete product. Please try again.';
      console.error('Delete Product Error:', error);
    }
  }
}
