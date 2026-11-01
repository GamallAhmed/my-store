import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './shared/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient( withInterceptors([loadingInterceptor])),    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right', // نقلناها فوق هنا يا فنان
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
    importProvidersFrom(NgxSpinnerModule )
  ],
};
