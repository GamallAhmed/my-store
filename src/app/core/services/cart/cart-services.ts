import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICart } from '../../../shared/interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  cartCount = signal<number>(0);
  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userToken') || '';
    }
    return '';
  }
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      { productId: id },
      { headers: { token: this.getToken() } },
    );
  }
  getLoggedUserCart(): Observable<ICart | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }
    return this.httpClient.get<ICart>(`${environment.baseUrl}/api/v1/cart`, {
      headers: { token: this.getToken() },
    });
  }
  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: { token: this.getToken() },
    });
  }
  updateCartQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      { count: newCount },
      {
        headers: { token: this.getToken() },
      },
    );
  }
  clearCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:{token: this.getToken()}
      }
    )
  }
}
