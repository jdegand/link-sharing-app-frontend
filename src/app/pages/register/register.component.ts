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
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  submit() {
    /*
    this.http
      .post<{ user: UserInterface }>('https://api.realworld.io/api/users', {
        user: this.registerForm.value,
      })
      .subscribe((response) => {
        console.log('response', response);
        localStorage.setItem('token', response.user.token);
        //this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      });
    */
    this.apiService.register(this.registerForm.getRawValue()).subscribe(response => {
      console.log('res', response);
      this.success = true;
      //localStorage.setItem('token', response.user.token);
      //this.authService.currentUserSig.set(response.user);

      // use toast for success & error

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered' });
    })
  }

}
