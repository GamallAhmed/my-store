import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Categories } from '../../core/services/categories/categories';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  imports: [],
  selector: 'app-category',
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class Category implements  OnInit {
  myCategories:ICategory[]=[]
  private readonly categories=inject(Categories);
  private readonly cdr=inject(ChangeDetectorRef)
  ngOnInit(): void {
      this.getAllcategoris()
  }
  getAllcategoris():void{
    this.categories.getAllCategories().subscribe({
      next:(response)=>{
          console.log(response.data);
          this.myCategories=response.data
          this.cdr.markForCheck(); 
      },
      error:(error)=>{
        console.log(error);
        this.cdr.markForCheck(); 
      }
    })
  }

}
