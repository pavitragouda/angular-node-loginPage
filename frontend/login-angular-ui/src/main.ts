import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatSnackBarModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  template: `
<div style="margin-top:2vw;margin-left:2vw">
  <form [formGroup]="loginForm" (ngSubmit)="login()" class="login-form">
<div >
<mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" formControlName="email" />
    <mat-error *ngIf="email.hasError('required')">
      Email is required
    </mat-error>
    <mat-error *ngIf="email.hasError('email')">
      Enter a valid email
    </mat-error>
  </mat-form-field>
</div>
  
<div>
<mat-form-field appearance="outline">
    <mat-label>Password</mat-label>
    <input matInput type="password" formControlName="password" />
    <mat-error *ngIf="password.hasError('required')">
      Password is required
    </mat-error>
    <mat-error *ngIf="password.hasError('minlength')">
      Min 6 characters
    </mat-error>
  </mat-form-field>

</div>
  <div>
<button mat-raised-button color="primary" type="submit">
    Login
  </button>
</div>
  

</form>
</div>
  


     `,
})

export class App {
  message = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) {}

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  
  login() {
this.loginForm.markAllAsTouched();

   
const payload = this.loginForm.getRawValue();

   this.auth.login(payload).subscribe(
  (data: any) => {
     this.snackBar.open(data.message, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: ['success-snackbar']
      });
  },
  (error) => {
    
 this.snackBar.open(error.error?.message, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
  }
);

   
    }
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});
