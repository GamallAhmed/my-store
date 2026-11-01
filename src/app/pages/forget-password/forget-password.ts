import { NgClass } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../core/services/auth/forgot-password-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  styleUrl: './forget-password.css',
  templateUrl: './forget-password.html',
})
export class ForgetPassword {
  private readonly forgotPasswordService = inject(ForgotPasswordService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef); // لحل مشكلة عدم إحساس أنجولار بالتحديثات فوراً

  step: number = 1;

  verfiyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyResetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  // 1. إرسال وتأكيد الإيميل
  verifyEmailSubmit(): void {
    if (this.verfiyEmail.invalid) return;

    const userEmail = this.verfiyEmail.get('email')?.value;
    this.resetPassword.patchValue({ email: userEmail });

    this.forgotPasswordService.setEmailVerify(this.verfiyEmail.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.statusMsg === 'success' || response.status === 'Success') {
          this.step = 2;
          this.cdr.detectChanges(); // إجبار أنجولار تحدث الشاشة فوراً من غير ضغطتين
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // 2. التحقق من الكود
  verifyCodeSubmit(): void {
    if (this.verifyResetCode.invalid) return;

    this.forgotPasswordService.resetCodeVerify(this.verifyResetCode.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status === 'Success' || response.statusMsg === 'success') {
          this.step = 3;
          this.cdr.detectChanges(); // تحديث فوري للشاشة للخطوة الثالثة
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // 3. إعادة تعيين الباسورد النهائي
  verifyPasswordSubmit(): void {
    if (this.resetPassword.invalid) return;
    this.forgotPasswordService.resetPassword(this.resetPassword.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem('userToken', response.token);
        }
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}