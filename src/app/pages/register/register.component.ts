import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { UserResponse } from '../../interfaces/UserResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ToastModule, InputTextModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  success = false;

  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  apiService = inject(ApiService);
  router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required], // Validators.email causes issues
    password: ['', Validators.required],
  });

  submit() {
    console.log('registerForm', this.registerForm);
    // need interface for response
    // realworld api just sends a user object back that has no errors object or status codes 
    this.apiService.register(this.registerForm.getRawValue()).subscribe({
      next: (response: Partial<UserResponse>) => { // typing still needs work
        this.success = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.user?.username + ' Registered' });
      },
      error: (err: ErrorResponse) => {
        this.success = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      },
      complete: () => {
        console.log('done');
      }
    })
  }

}
