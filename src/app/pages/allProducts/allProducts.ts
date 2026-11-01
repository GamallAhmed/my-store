import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Products } from '../../core/services/products/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartServices } from '../../core/services/cart/cart-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Allproducts implements OnInit {
  private readonly ProductsService = inject(Products);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly cartServices=inject(CartServices);
  private readonly toastrService=inject(ToastrService)
  products: IProduct[] = [];
  currentPage: number = 1;
  pageSize: number = 28;
  totalPages: number = 2;

  ngOnInit(): void {
    console.log('--- Products Component Initialized ---');
    this.getProducts();
  }

  getProducts() {
    console.log('--- Calling getProducts() ---');
    this.ProductsService.getAllProducts().subscribe({
      next: (response) => {
        console.log('--- Data Received: ---', response);
        this.products = response.data;
        
        // السطر ده هو السحر كله: بيجبر الـ UI يترسم ويعرض المنتجات فوراً أول ما الـ API يرد
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('--- Error: ---', error);      
      }
    });
  }
addToCart(id: string): void {
  this.cartServices.addProductToCart(id).subscribe({
    next: (response) => {
      console.log('Added to cart:', response);
      this.toastrService.success(response.message)
            this.cartServices.getLoggedUserCart().subscribe({
        next: (cartRes) => {
          if (cartRes) {
            this.cartServices.cartCount.set(cartRes.numOfCartItems);
          }
        }
      });

      // (اختياري) Toast أو رسالة نجاح ظريفة
    },
    error: (error) => 
    {
      console.log(error)
      this.toastrService.error('Product Not Added To Cart')
    }
  });
}
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPagiinationProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(startIndex, startIndex + this.pageSize);
  }
}