import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class Categories {
    private readonly httpClient=inject(HttpClient);
    getAllCategories():Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
    }
    getSpecificCategory(id:string):Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
    }
}
