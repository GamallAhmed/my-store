import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../core/services/auth/register-service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private readonly registerService = inject(RegisterService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router=inject(Router);
  isLoading: boolean = false;
  msgError: string = '';
  isSuccess:string='';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),

    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/)
    ]),

    rePassword: new FormControl(null, [
      Validators.required
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ])

  }, {
    validators: this.confirmPassword
  });

  submitForm(): void {

    if (this.registerForm.valid) {
      this.isLoading = true;
      this.msgError = '';

      this.registerService.sendRegisterFrom(this.registerForm.value).subscribe({

        next: (response) => {
          console.log('API Success Response:', response);
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000);
          
          this.isLoading = false;
          this.isSuccess=response.message;
          this.cdr.detectChanges();
          this.isSuccess=response.message;
        },

        error: (error) => {
          console.log('API Error:', error);

          this.msgError = error.error.message;
          this.isLoading = false;
          this.cdr.detectChanges();
        }

      });

    }

  }

  confirmPassword(group: AbstractControl) {

    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };

  }

}