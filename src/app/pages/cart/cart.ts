import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServices } from '../../core/services/cart/cart-services';
import { ICart } from '../../shared/interfaces/icart';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  private readonly cartServices = inject(CartServices);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService=inject(ToastrService)
  cartDetails = signal<ICart | null>(null);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.getCartData();
  }
  }

  getCartData(): void {
    this.cartServices.getLoggedUserCart().subscribe({
      next: (response: ICart | null) => {
        console.log('Cart response:', response);
        if (response) {
          console.log('Cart response:', response);
          this.cartDetails.set(response);
          this.cartServices.cartCount.set(response.numOfCartItems);
        }
      },
      error: (error) => console.log('Cart Error:', error),
    });
  }
  removeItem(id: string): void {
    this.cartServices.removeSpecificCartItem(id).subscribe({
      next: (response: ICart) => {
        console.log('Item Removed:', response);
        this.toastrService.success('Item Removed Successfuly')
        this.cartDetails.set(response);
        this.cartServices.cartCount.set(response.numOfCartItems);
      },
      error: (error) => {
        console.log('Remove Error:', error);
        this.toastrService.error("Can't Remove Item From Cart")
      },
    });
  }
  updateCount(id: string, count: number): void {
    if (count <= 0) {
      this.removeItem(id); // لو الكمية بقت صفر أو أقل، نحذفه فوراً
      return;
    }

    this.cartServices.updateCartQuantity(id, count).subscribe({
      next: (response: ICart) => {
        console.log('Cart Updated:', response);
        this.cartDetails.set(response); // تحديث السلة فواقاً
        this.cartServices.cartCount.set(response.numOfCartItems);
        this.toastrService.success('Quantity Updated Successfuly')
      },
      error: (error) => {
        console.log('Update Error:', error);
        this.toastrService.error("Can't Updated Quantity")
      },
    });
  }
  clearUserCart():void{
      this.cartServices.clearCart().subscribe({
        next: (response) => {
        console.log('Cart Cleared:', response);
        this.toastrService.success('Cart Cleared Successfully');
        this.cartDetails.set(null); 
        this.cartServices.cartCount.set(0);
      },
      error: (error) => {
        console.log('Clear Cart Error:', error);
        this.toastrService.error('Can not cleared cart');
      },
      })
  }
}