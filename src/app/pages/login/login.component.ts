import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  apiService = inject(ApiService);
  router = inject(Router);
  messageService = inject(MessageService);
  error = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.apiService.login(this.loginForm.value)
      .subscribe({
        next: (response:any) => {
        console.log('response', response);
        this.error = false;
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log('errr', err);
          this.error = true;
          this.authService.currentUserSig.set(null);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' });
        },
      })
  }
}
