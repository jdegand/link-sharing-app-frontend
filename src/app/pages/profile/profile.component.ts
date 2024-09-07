import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ButtonModule } from "primeng/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { ApiService } from "../../services/api/api.service";
import {
  FileSelectEvent,
  FileUpload,
  FileUploadModule,
} from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { NgFor, NgIf } from "@angular/common";
import { MessageService } from "primeng/api";
import { take } from "rxjs";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    FileUploadModule,
    ToastModule,
    NgIf,
    NgFor,
  ],
  providers: [MessageService],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  messageService = inject(MessageService);

  profileForm!: FormGroup;

  fragment = this.route.snapshot.fragment;

  @ViewChild("imageUpload") imageUpload!: FileUpload;

  #fileType = "";
  loading = false;

  ngOnInit() {
    // I made all fields required
    // To allow file to be optional requires extra work on the frontend & backend
    this.profileForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      file: [null, Validators.required],
    });
  }

  onFileSelect(event: FileSelectEvent) {
    const files: File[] = event.files;
    if (files.length === 1) {
      const file: File = files[0];
      this.#fileType = file.type;
      this.profileForm.get("file")?.setValue(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append("file", this.profileForm.get("file")?.value);
      formData.append("firstname", this.profileForm.get("firstname")?.value);
      formData.append("lastname", this.profileForm.get("lastname")?.value);
      formData.append("email", this.profileForm.get("email")?.value);
      formData.append("fileType", this.#fileType);

      this.loading = true;

      this.apiService
        .postProfile(formData)
        .pipe(take(1))
        .subscribe({
          next: () => { // response: PostProfile
            this.loading = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Profile updated",
            });
            // You could reset the whole form here.  Better to just reset file ?
            this.imageUpload.clear();
          },
          error: (err: ErrorResponse) => {
            this.loading = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          },
        });
    } else {
      for (const field in this.profileForm.controls) {
        const control = this.profileForm.get(field);
        control?.markAsTouched();
      }
    }
  }
}
