import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const nGxSpinnerService=inject(NgxSpinnerService);
   
        nGxSpinnerService.show();
    
    
  return next(req).pipe(finalize(()=>{
    nGxSpinnerService.hide();
  }));
};
