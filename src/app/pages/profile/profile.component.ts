import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ApiService } from '../../services/api/api.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ButtonModule, ReactiveFormsModule, InputTextModule, MessageModule, FileUploadModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  apiService = inject(ApiService);
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
      console.log(this.profileForm.value);
      this.apiService.postProfile(this.profileForm.value).subscribe((res) => console.log(res));
    }
  }

}
