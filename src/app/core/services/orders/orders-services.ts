import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class OrdersServices {
    private readonly httpClient=inject(HttpClient);
      private readonly platformId = inject(PLATFORM_ID);

    private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userToken') || '';
    }
    return '';
  }
    checkoutPayment(id:string,data:object):Observable<any>{
        return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
            {
                'shippingAddress':data
            },
            {
                headers:{ token: this.getToken() }
            }
        )
    }

}
