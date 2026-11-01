import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from './auth-service'; // استدعاء الـ AuthService

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly _authService = inject(AuthService); // حقن الـ AuthService هنا

    userData: any = null;

    submitLoginForm(data: object): Observable<any> {
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
    }

    saveUserData(): void {
        if (localStorage.getItem('userToken') !== null) {      
            this.userData = jwtDecode(localStorage.getItem('userToken')!);
            console.log(this.userData);
            
            // 🔥 هنا السر: أول ما يحفظ التوكن، يبلغ الـ Auth Service فوراً
            this._authService.updateTokenStatus();
        }
    }

    logout(): void {
        localStorage.removeItem('userToken');
        this.userData = null;
        this._authService.updateTokenStatus(); // تحديث الحالة عند الخروج برضه
        this.router.navigate(['/login']);
    }
}