
import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Categories } from '../../core/services/categories/categories';

import { ICategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { Products } from '../../core/services/products/products';
import { CartServices } from '../../core/services/cart/cart-services';
import { response } from 'express';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  imports: [CarouselModule, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly ProductsService=inject(Products); //inject product service
  private readonly categoryService=inject(Categories);
  private readonly cartServices=inject(CartServices);
  private readonly toastrService=inject(ToastrService);

  products:IProduct[]=[];
  categories:ICategory[]=[];
   ngOnInit(): void {
      this.getProductsData();
      this.getCategoryData();
  }
  getProductsData(){
   
    this.ProductsService.getAllProducts().subscribe({
        next:(response)=>{
            console.log(response.data);   
            this.products=response.data;   
           
          
          },
        error:(error)=>{
            console.log(error); 
        
        }
      })
  }
  getCategoryData(){
    this.categoryService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories=response.data;
        console.log(response.data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
 addToCart(id: string): void {
  this.cartServices.addProductToCart(id).subscribe({
    next: (response) => {
      console.log('Added to cart:', response);
      this.toastrService.success(response.message,'E commerce')
      // أول ما المنتج يتضاف بنجاح، نجيب بيانات السلة فوراً عشان النافبار تحدث الرقم
      this.cartServices.getLoggedUserCart().subscribe({
        next: (cartRes) => {
          if (cartRes) {
            this.cartServices.cartCount.set(cartRes.numOfCartItems);

          }
        }
      });

      // (اختياري) Toast أو رسالة نجاح ظريفة
    },
    error: (error) =>{
      console.log(error);
      this.toastrService.error("Product not Added To cart")
    } 
  });
}

customCategoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      0: { items: 2 },    
      600: { items: 3 },  
      940: { items: 4 },  
      1200: { items: 6 }  
    }
  }
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    nav: false
  }

}
