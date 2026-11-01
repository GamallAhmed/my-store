import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class Products {
   private readonly httpClient=inject(HttpClient);

   getAllProducts():Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/products`);
   }
   getSpecifcProduct(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
   }
}
