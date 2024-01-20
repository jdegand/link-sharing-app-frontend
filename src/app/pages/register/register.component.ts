import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
    this.apiService.register(this.registerForm.getRawValue()).subscribe(response => {
      console.log('res', response);
      this.success = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered' });
    })
  }

}

/*

// doing something like this -> the messages don't display

submit() {
  console.log('registerForm', this.registerForm);
  // need interface for response
  // realworld api just sends a user object back that has no errors object or status codes 
  this.apiService.register(this.registerForm.getRawValue()).subscribe({
    next: (response: Partial<UserInterface>) => {
      console.log(response);
      this.success = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered' });
    },
    error: (err: ErrorResponse) => {
      this.success = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed' });
    },
    complete: () => {
      console.log('done');
    }
  })
}
*/