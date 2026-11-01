import { Component, inject, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/services/products/products';
import { IproductInfo } from '../../shared/interfaces/iproduct-info';
import {  NgClass } from '@angular/common';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-product-info',
  imports: [NgClass],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductInfo implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly products = inject(Products);
  private readonly cdr = inject(ChangeDetectorRef);

  productId: string | null = null;
  productDetails: IproductInfo | null = null; 
  isLoading: boolean = true;
  
  // متغير لتخزين الصورة النشطة حالياً في العرض الكبير
  activeImage: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('productId') || params.get('id');
        if (this.productId) {
          this.getProductDetails(this.productId);
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  getProductDetails(id: string): void {
    this.isLoading = true;
    this.products.getSpecifcProduct(id).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.productDetails = response.data;
        } else {
          this.productDetails = response;
        }

        // تعيين أول صورة كصورة افتراضية أول ما البيانات تيجي
        if (this.productDetails && this.productDetails.images?.length > 0) {
          this.activeImage = this.productDetails.images[0];
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // دالة لتغيير الصورة الكبيرة لما المستخدم يضغط على صورة مصغرة
  changeActiveImage(img: string): void {
    this.activeImage = img;
  }
}