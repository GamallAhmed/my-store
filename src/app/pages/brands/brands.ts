import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // تأكد إن مسار الاستيراد الطبيعي عندك
import { BrandsServices } from '../../core/services/brands/brands-services';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  styleUrl: './brands.css',
  templateUrl: './brands.html',
})
export class Brands implements OnInit {
  private readonly brandsServices = inject(BrandsServices);
  private readonly _cdr = inject(ChangeDetectorRef); // 1. حقن الـ ChangeDetectorRef
  
  brands: IBrands[] = [];

  ngOnInit(): void {
    
      this.getAllBrands();
    
  }

  getAllBrands(): void {
    this.brandsServices.getAllBrands().subscribe({
      next: (response: any) => {
        this.brands = response.data;
        
        // 2. إجبار الصفحة على تحديث الـ UI وعرض البيانات فوراً
        this._cdr.markForCheck(); 
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
}