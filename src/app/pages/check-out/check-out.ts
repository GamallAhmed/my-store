import { response } from 'express';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersServices } from '../../core/services/orders/orders-services';
import { error } from 'console';

@Component({
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  selector: 'app-check-out',
  styleUrl: './check-out.css',
  templateUrl: './check-out.html',
})
export class CheckOut implements OnInit {
  private readonly formBuilder=inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersServices=inject(OrdersServices)
  cartId: string = '';
  checkOutForm!: FormGroup;
  ngOnInit(): void {
this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.cartId = params.get('id') || '';
      console.log('Cart ID from Route:', this.cartId);
    }
  });
    this.checkOutForm=this.formBuilder.group({
        details:[null,[Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null,[Validators.required]]
    })
  }
  submitForm():void{

        this.ordersServices.checkoutPayment(this.cartId,this.checkOutForm.value).subscribe({
            next(response) {
                console.log(response);  
                if(response.status==='success'){
                   open(response.session.url,'self')  
                }
               
                    
            },
            error(error) {
              console.log(error);
            },
        })
    
  }
}
