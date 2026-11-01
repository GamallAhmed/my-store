import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // بنعرفه كـ Signal عشان يبعت تنبيه لأي كومبوننت بيقرأه
  isLoggedIn = signal<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userToken'); // أو اسم التوكن عندك
    }
    return false;
  }

  // دالة لتحديث الحالة فوراً بعد الـ Login أو Logout
  updateTokenStatus() {
    this.isLoggedIn.set(this.hasToken());
  }
}