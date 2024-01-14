import { NgFor } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  private fb = inject(FormBuilder);
  count = signal(2);

  form = this.fb.group({
    links: this.fb.array([])
  });

  get links() {
    return this.form.controls["links"] as FormArray;
  }

  // this regex is too permissive
  #REGEX = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';

  ngOnInit(): void {

    // here I add the 2 different link objects
    // or add the default links to the links array directly ?
    // validator to check selected platform name is included in the url text

    // choices for validation -> 
    // 1. regex
    // 2. custom validator
    // 3. both

    const linkForm1: FormGroup = this.fb.group({
      platform: ['Github', Validators.required],
      url: ['https://www.github.com/username', [Validators.required, Validators.pattern(this.#REGEX)]]
    }, {
      validators: this.customValidator()
    });

    const linkForm2: FormGroup = this.fb.group({
      platform: ['YouTube', Validators.required],
      url: ['https://www.youtube.com/username', [Validators.required, Validators.pattern(this.#REGEX)]]
    }, {
      validators: this.customValidator()
    });

    this.links.push(linkForm1);
    this.links.push(linkForm2);
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
      platform: ['Facebook', Validators.required],
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
