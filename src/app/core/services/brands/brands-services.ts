import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class BrandsServices {
    private readonly httpClient=inject(HttpClient);
    getAllBrands():Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
    }
}
