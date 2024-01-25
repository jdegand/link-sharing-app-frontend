import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ButtonModule, ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  profileForm!: FormGroup;

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: [this.authService.currentUserSig()?.firstname, Validators.required],
      lastname: [this.authService.currentUserSig()?.lastname, Validators.required],
      email: [this.authService.currentUserSig()?.email],
      image: [this.authService.currentUserSig()?.image],
    });
  }

  onSubmit() {
    // valid is not enough when you pre-fill all the inputs
    if (this.profileForm.valid && this.profileForm.touched) {
      console.log(this.profileForm)
    }
  }

}
