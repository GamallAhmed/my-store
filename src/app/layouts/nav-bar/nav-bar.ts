import { CartServices } from './../../core/services/cart/cart-services';
import { ChangeDetectorRef, Component, inject, input, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/services/auth/login-service';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.css',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  
  private readonly loginService=inject(LoginService);
  private router=inject(Router)
  private readonly cartServices = inject(CartServices);
  private readonly _authService = inject(AuthService);
  private readonly _cdr = inject(ChangeDetectorRef);
  readonly count = this.cartServices.cartCount;
  isLoggin = this._authService.isLoggedIn;
  ngOnInit() {
    this._cdr.markForCheck();
    this.cartServices.getLoggedUserCart().subscribe({
      next: (res) => {
        this._cdr.markForCheck();
        if (res) this.cartServices.cartCount.set(res.numOfCartItems);
      }
    });
  }
  signOut() {
  localStorage.removeItem('userToken');
  this._authService.updateTokenStatus(); // <-- بيحدث الحالة فوراً
  this.router.navigate(['/login']);
}
}
