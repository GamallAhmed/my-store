import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginService } from '../../core/services/auth/login-service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly loginService = inject(LoginService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  submitLogginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.msgError = '';
      
      this.loginService.submitLoginForm(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('API Success Response:', response);

          // 1. حفظ التوكن في اللوكال ستوريج
          localStorage.setItem('userToken', response.token);
          
          // 2. تحديث حالة الـ Signal فوراً ليتم إشعار الـ Navbar
          this.loginService.saveUserData();

          this.isLoading = false;
          this.isSuccess = response.message;
          this.cdr.detectChanges();

          // 3. الانتقال لصفحة الـ Home بسلاسة تامة بدون ريفرش
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 500);
        },
        error: (error) => {
          console.log('API Error:', error);
          this.msgError = error.error.message;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}