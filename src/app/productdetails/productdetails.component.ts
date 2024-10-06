import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductServices } from '../services/products/products.services';
import { Product } from '../shared/models/Product';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { LatestProductsComponent } from '../latest-products/latest-products.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LatestProductsComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css',
})
export class ProductdetailsComponent {
  productId: number = 1;
  product: Product | undefined;
  quantity: number = 1;
  pruductArr: Product[] = []; // Array to hold products
  searchQuery: string = ''; // Variable to bind with search input

  constructor(
    private activatedRout: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private productService: ProductServices,
    private productServices: ProductServices,
    private cartservice: CartService
  ) {
    this.activatedRout.params.subscribe((params) => {
      this.productId = Number(params['id']);
    });
    this.getProduct(this.productId);
    this.loadAllProducts();
  }

  private loadAllProducts() {
    this.productServices.getAllProducts().then((productList: Product[]) => {
      this.pruductArr = productList;
    });
  }

  // Method to search products
  searchProducts() {
    if (this.searchQuery) {
      this.productServices
        .searchProducts(this.searchQuery)
        .then((result: Product[]) => {
          this.pruductArr = result;
        });
    } else {
      // If the search query is empty, load all products again
      this.loadAllProducts();
    }
  }

  //calling service to display product
  getProduct(productselected: number) {
    this.productService
      .getProductById(productselected)
      .then((returnedproduct) => {
        this.product = returnedproduct;
      });

    window.scrollTo(0, 0);
  }
  //calling service to display product when show details button clicked in related products corasoul
  onShowDetailsClicked(productselected: number) {
    this.getProduct(productselected);
  }
  //Add to Cart
  addCartItem(product: any) {
    this.cartservice.addToCart(product, this.quantity);
  }

  deleteProduct(product: any) {
    this.productServices.deleteProduct(product);
  }

  //configuration for related products corasoul
  slideConfigRelatedProducts = {
    accessibility: true,
    dots: false,
    slidesToShow: 3,
    autoplay: false,
    autoplaySpeed: 1500,
    isFinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: '<button type="button" class="logoslick-next"><i class="fa fa-arrow-right"></i></button>',
    prevArrow: '<button type="button" class="logoslick-prev"><i class="fa fa-arrow-left"></i></button>',

  };
}
