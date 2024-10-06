import { Product } from '../../shared/models/Product';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProductServices {
  productsURL = 'http://localhost:3000/products';
  constructor() {}
  // Get all products read
  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.productsURL);
    return (await data.json()) ?? []; //return array if null data
  }
  async getProductById(Id: number): Promise<Product | undefined> {
    const data = await fetch(`${this.productsURL}/${Id}`);
    return (await data.json()) ?? []; //return array if null data
  }

  async getLatestProduct(): Promise<Product | undefined> {
    const data = await fetch(this.productsURL);
    return (await data.json()) ?? []; //return array if null data
  }
  async getRelatedProduct(title:string): Promise<Product | undefined> {
    const data = await fetch(this.productsURL);
    return (await data.json()) ?? []; //return array if null data
  }

  async searchProducts(query: string): Promise<Product[]> {
    const data = await fetch(this.productsURL);
    const products: Product[] = await data.json();
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    ); // filter products by query in title
  }

    // Register a new user
  async addNewProduct(title: string, detail: string, Price = 1000 , color = "" , discount : number, photo :string): Promise<boolean> {
      const data = await fetch(this.productsURL);
      const productData = await data.json(); // Fetch the entire JSON object
      const products = productData ?? []; // Extract the users array
    
      // Check if the username already exists
      const productExists = products.some((product: any) => product.title === title);
    
      if (!productExists) {
        const newProduct = {
          id: (products.length + 1).toString(), // Ensure the ID is a string
          title,
          detail,
          Price,
          color,
          discount,
          photo
        };
    
        // Use POST to add the new user to the JSON file
        await fetch(this.productsURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct) // Send only the new user data
        });
    
        return true; // Registration successful
      }
    
      return false; // Username already exists
    }

    async deleteProductByTitle(title: string): Promise<boolean> {
      const data = await fetch(this.productsURL);
      const products: Product[] = await data.json();
      
      // Find the index of the product with the matching title
      const productIndex = products.findIndex(product => product.title.toLowerCase() === title.toLowerCase());
  
      if (productIndex !== -1) {
        // Remove the product from the array
        products.splice(productIndex, 1);
  
        // Update the JSON file with the modified products array
        await fetch(this.productsURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(products),
        });
  
        return true; // Return true if the product was successfully deleted
      }
  
      return false; // Return false if no product with the specified title was found
    }

  // async deleteProductByTitle(title: string): Promise<boolean> {
  //     const response = await fetch(`${this.productsURL}/${title}`, {
  //       method: 'DELETE'
  //     });
  
  //     return response.ok; // Returns true if deletion was successful
  //   }


  // deleteProduct(productId: string): void {
  //   fetch(this.productsURL)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       let products = data.products ?? [];
  
  //       // Find the index of the product with the given ID
  //       const productIndex = products.findIndex((product: any) => product.id === productId);
  //       console.log(productIndex);
  //       console.log(products);
  //       if (productIndex !== -1) {
  //         // Remove the product from the array
  //         products.splice(productIndex, 1);
  
  //         // Update the JSON file with the new array
  //         fetch(this.productsURL, {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({ products }) // Overwrite the file with updated data
  //         })
  //         .then(() => {
  //           console.log(`Product with id ${productId} deleted successfully.`);
  //         })
  //         .catch((error) => console.error('Error updating the products:', error));
  //       } else {
  //         console.error(`Product with id ${productId} not found.`);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching the products:', error));
  // }


  async deleteProduct(productId: string): Promise<void> {
    try {
        const response = await fetch(this.productsURL);
        const productData = await response.json();
        let products = productData ?? []; // Access the products array
 
        // Find the index of the product with the given ID
        const productIndex = products.findIndex((product: any) => product.id === productId);
 
        if (productIndex !== -1) {
            // Remove the product from the array
            products.splice(productIndex, 1);
 
            // Update the JSON file with the new array, preserving the structure
            await fetch(this.productsURL, {
                method: 'PUT', // Use PUT to overwrite the existing data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // Wrap the updated array in the same structure
            });
 
            console.log(`Product with id ${productId} deleted successfully.`);
        } else {
            console.error(`Product with id ${productId} not found.`);
        }
    } catch (error) {
        console.error('Error deleting the product:', error);
    }
}


// async deleteProduct(productId: string): Promise<void> {
//   try {
//       // Fetch the current products from the local JSON file
//       const response = await fetch(this.productsURL);
//       const productData = await response.json();
//       let products = productData ?? [];

//       // Find the index of the product with the given ID
//       const productIndex = products.findIndex((product: any) => product.id === productId);

//       if (productIndex !== -1) {
//           // Remove the product from the array
//           products.splice(productIndex, 1);

//           // Update the local JSON file with the new array (overwrite the file)
//           const updatedData = { products };

//           // Convert the updated data back to a JSON string
//           const jsonData = JSON.stringify(updatedData, null, 2);

//           // Write the updated JSON data back to the local file
//           const fileSystem = require('fs');
//           fileSystem.writeFileSync(this.productsURL, jsonData);

//           console.log(`Product with id ${productId} deleted successfully.`);
//       } else {
//           console.error(`Product with id ${productId} not found.`);
//       }
//   } catch (error) {
//       console.error('Error deleting the product:', error);
//   }
// }

}
  


