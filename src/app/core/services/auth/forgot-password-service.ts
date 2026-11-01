import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class ForgotPasswordService {
    private readonly httpClient=inject(HttpClient);

    setEmailVerify(email:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
    };

    resetCodeVerify(code:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, code);    };
     resetPassword(password:object):Observable<any>{
        return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,password)
    };


}
