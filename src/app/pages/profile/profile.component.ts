import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ApiService } from '../../services/api/api.service';
import { FileUploadErrorEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgFor, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';

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
      img: ['']
    });
  }

  onFileSelect(event: any) {
    if (event.files.length > 0) {
      const file = event.files[0];
      this.profileForm.get('img')?.setValue(file);
    }
  }

  onSubmit() {
    // valid is not enough when you pre-fill all the inputs
    if (this.profileForm.valid && this.profileForm.touched) {
      console.log(this.profileForm.value);
      const formData = new FormData();
      formData.append('img', this.profileForm.get('img')?.value);
      formData.append('firstname', this.profileForm.get('firstname')?.value);
      formData.append('lastname', this.profileForm.get('lastname')?.value);
      formData.append('email', this.profileForm.get('email')?.value);
      /*
      // have to loop to view formData
      // causes typescript issues
      for (const value of formData.values()) {
        console.log(value);
      }
      */
      // need to add message service 
      //this.apiService.postProfile(this.profileForm.value).subscribe((res) => console.log(res));
      this.apiService.postProfile(formData).subscribe((res) => console.log(res));
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
