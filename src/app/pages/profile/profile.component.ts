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

  profileForm!: FormGroup;

  fragment = this.route.snapshot.fragment;

  @ViewChild('imageForm') imageForm!: any;

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: [this.authService.currentUserSig()?.firstname, Validators.required],
      lastname: [this.authService.currentUserSig()?.lastname, Validators.required],
      email: [this.authService.currentUserSig()?.email],
      //image: [this.authService.currentUserSig()?.image],
    });
  }

  onSubmit() {
    // valid is not enough when you pre-fill all the inputs
    if (this.profileForm.valid && this.profileForm.touched) {
      console.log(this.profileForm.value);
      this.apiService.postProfile(this.profileForm.value).subscribe((res) => console.log(res));
    }
  }

  onUpload(event: FileUploadEvent) {
    // https://github.com/primefaces/primeng/issues/4018

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded' });
    this.imageForm.clear();
  }

  onUploadError(event: FileUploadErrorEvent){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: event.error?.message });
    this.imageForm.clear();
  }

}
