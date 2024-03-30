import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Options } from "../../interfaces/Options";
import { AuthService } from "../../services/auth/auth.service";
import { ApiService } from "../../services/api/api.service";
import { ToastModule } from "primeng/toast";
import { MessageModule } from "primeng/message";
import { MessageService } from "primeng/api";
import { Link } from "../../interfaces/Link";
import { take } from "rxjs";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService],
  templateUrl: "./links.component.html",
  styleUrl: "./links.component.css",
})
export class LinksComponent implements OnInit {
  apiService = inject(ApiService);
  messageService = inject(MessageService);
  linksForm: FormGroup;
  link: FormArray;
  platforms: Options[] = [];
  loading = false;

  count = signal(2);

  // eslint-disable-next-line
  #REGEX =
    "(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?/[a-zA-Z0-9]{2,}";

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.linksForm = this.fb.group({
      links: this.fb.array([]),
    });
    this.link = this.linksForm.get("links") as FormArray;
    this.platforms = [
      { label: "Github", value: "github" }, // need value lowercase for the icon
      { label: "YouTube", value: "youtube" },
      { label: "Facebook", value: "facebook" },
      { label: "Instagram", value: "instagram" },
      { label: "Twitter", value: "twitter" },
      { label: "LinkedIn", value: "linkedin" },
    ];
  }

  ngOnInit(): void {
    const linkForm1: FormGroup = this.fb.group(
      {
        platform: ["github", Validators.required],
        url: [
          "https://www.github.com/username",
          [Validators.required, Validators.pattern(this.#REGEX)],
        ],
      },
      {
        validators: this.customValidator(),
      },
    );

    const linkForm2: FormGroup = this.fb.group(
      {
        platform: ["youtube", Validators.required],
        url: [
          "https://www.youtube.com/username",
          [Validators.required, Validators.pattern(this.#REGEX)],
        ],
      },
      {
        validators: this.customValidator(),
      },
    );

    this.links.push(linkForm1);
    this.links.push(linkForm2);
  }

  get links() {
    return this.linksForm.controls["links"] as FormArray;
  }

  private customValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const platform = group.controls["platform"].value;
      const url = group.controls["url"].value;

      // need to check if url has a period first
      // might not be best to depend on array segments but dealing with a known sequence
      // find index of both periods and slice the string and compare that to the select value
      if (
        url.indexOf(".") !== -1 &&
        url.split(".")[1].toLowerCase() === platform.toLowerCase()
      ) {
        return null;
      }

      return { platformDoesNotMatchUrl: true };
    };
  }

  addLink() {
    // run a function for random option ?
    // have a array or queue and get each option in same order as select options?

    this.count.update((value) => value + 1);

    const newLinkForm: FormGroup = this.fb.group(
      {
        platform: ["facebook", Validators.required],
        url: [
          "https://www.facebook.com/username",
          [Validators.required, Validators.pattern(this.#REGEX)],
        ],
      },
      {
        validators: this.customValidator(),
      },
    );

    this.links.push(newLinkForm);
  }

  deleteLink(linkIndex: number) {
    this.count.update((value) => value - 1);
    this.links.removeAt(linkIndex);
  }

  setUrlError(): void {
    const linksArray = this.linksForm.get("links") as FormArray;

    linksArray.controls.forEach((control: AbstractControl) => {
      control.setErrors({
        urlUnchanged: true,
      });
    });
  }

  checkUrlValues() {
    const linksArray = this.linksForm.get("links") as FormArray;

    let urlUntouched = true;

    linksArray.controls.forEach((control: AbstractControl) => {
      if (
        typeof control.value.url === "string" &&
        !control.value.url.includes("username")
      ) {
        urlUntouched = false;
      }
    });
    return urlUntouched;
  }

  onSubmit() {
    // valid is not enough when you pre-fill all the inputs
    if (this.linksForm.valid && !this.checkUrlValues()) {
      this.loading = true;
      this.apiService
        .postLinks(this.linksForm.value.links)
        .pipe(take(1))
        .subscribe({
          next: (res: Link[]) => {
            this.loading = false;
            if (res.length >= 2) {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Links saved",
              });
            } else {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Link saved",
              });
            }
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
      this.setUrlError();
    }
  }
}
