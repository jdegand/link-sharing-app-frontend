import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface Options {
  label: string;
  value: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, InputTextModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  form: FormGroup;
  link: FormArray;
  platforms: Options[] = []; // need to create an interface

  count = signal(2);

  #REGEX = '(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      links: this.fb.array([]),
    });
    this.link = this.form.get('links') as FormArray
    this.platforms = [
      { label: 'Github', value: 'github' }, // need value lowercase for the icon
      { label: 'YouTube', value: 'youtube' },
      { label: 'Facebook', value: 'facebook' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'Twitter', value: 'twitter' },
      { label: 'LinkedIn', value: 'linkedin' },
    ];
  }

  ngOnInit(): void {
    const linkForm1: FormGroup = this.fb.group({
      platform: ['github', Validators.required],
      url: ['https://www.github.com/username', [Validators.required, Validators.pattern(this.#REGEX)]]
    }, {
      validators: this.customValidator()
    });

    const linkForm2: FormGroup = this.fb.group({
      platform: ['youtube', Validators.required],
      url: ['https://www.youtube.com/username', [Validators.required, Validators.pattern(this.#REGEX)]]
    }, {
      validators: this.customValidator()
    });

    this.links.push(linkForm1);
    this.links.push(linkForm2);
  }

  get links() {
    return this.form.controls['links'] as FormArray;
  }

  private customValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const platform = group.controls['platform'].value;
      const url = group.controls['url'].value;

      // need to check if url has a period first
      // might not be best to depend on array segments but dealing with a known sequence 
      // find index of both periods and slice the string and compare that to the select value 
      if (url.indexOf('.') !== -1 && url.split('.')[1].toLowerCase() === platform.toLowerCase()) {
        return null
      }

      return { platformDoesNotMatchUrl: true }
    };
  }

  addLink() {
    // run a function for random option ?
    // have a array or queue and get each option in same order as select options?

    this.count.update(value => value + 1);

    const newLinkForm: FormGroup = this.fb.group({
      platform: ['facebook', Validators.required],
      url: ['https://www.facebook.com/username', [Validators.required, Validators.pattern(this.#REGEX)]]
    }, {
      validators: this.customValidator()
    });

    this.links.push(newLinkForm);
  }

  deleteLink(linkIndex: number) {
    this.count.update(value => value - 1);
    this.links.removeAt(linkIndex);
  }

  onSubmit() {
    // valid is not enough when you pre-fill all the inputs
    if (this.form.valid && this.form.touched) {
      console.log(this.form)
    }
  }

}
