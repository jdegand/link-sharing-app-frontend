import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ToastModule, InputTextModule, ButtonModule, MessageModule, PasswordModule],
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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit() {
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).pipe(take(1)).subscribe({
        next: (response: Partial<UserInfoDto>) => {
          this.success = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.username + ' registered' });
        },
        error: (err: HttpErrorResponse) => {
          this.success = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        }
      })
    }
  }

}
