import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ApiService } from '../../services/api/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgFor, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { PostProfile } from '../../interfaces/PostProfile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ButtonModule, ReactiveFormsModule, InputTextModule, MessageModule, FileUploadModule, ToastModule, NgIf, NgFor],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  jwtService = inject(JwtDecoderService);

  profileForm!: FormGroup;

  fragment = this.route.snapshot.fragment;

  @ViewChild('imageForm') imageForm!: any;

  #fileType = '';
  loading = false;

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      file: ['']
    });
  }

  onFileSelect(event: any) {
    if (event.files.length === 1) {
      const file = event.files[0];
      this.#fileType = file.type;
      this.profileForm.get('file')?.setValue(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('file', this.profileForm.get('file')?.value);
      formData.append('firstname', this.profileForm.get('firstname')?.value);
      formData.append('lastname', this.profileForm.get('lastname')?.value);
      formData.append('email', this.profileForm.get('email')?.value);
      formData.append('fileType', this.#fileType);
      /*
      // have to loop to view formData
      // causes typescript issues
      // @ts-ignore
      for (const value of formData.values()) {
        console.log('value',value);
      }
      */
      this.loading = true;

      this.apiService.postProfile(formData).subscribe({
        next: (response: PostProfile) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated' });
          // reset the form & make file blank
        },
        error: (err: any) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Profile update failed' });
        },
        complete: () => {
          console.log('done');
        }
      });
    }
  }

}
