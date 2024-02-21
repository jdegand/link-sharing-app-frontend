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

  ngOnInit() {

    /*
    const accessToken = this.authService.currentUserSig()?.accessToken;

    if(accessToken){
      const decodedToken = this.jwtService.decodeToken(accessToken);
      console.log('token sub', decodedToken.sub);
    }
    */

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

      this.apiService.postProfile(formData).subscribe({
        next: (response: PostProfile) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated' });
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Profile update failed' });
        },
        complete: () => {
          console.log('done');
        }
      });
    }
  }

  /*
  onBeforeSend(event: any) {
    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  onUpload(event: FileUploadEvent) {
    // https://github.com/primefaces/primeng/issues/4018

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded' });
    this.imageForm.clear();
  }

  onUploadError(event: FileUploadErrorEvent) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: event.error?.message });
    this.imageForm.clear();
  }
  */

}
