import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Directive({
  selector: 'p-fileUpload[formControlName], p-fileUpload[formControl]',
  standalone: true,
  providers: [
    FileUpload,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadControlValueAccessorDirective),
      multi: true,
    },
  ],
})
export class FileUploadControlValueAccessorDirective
  implements ControlValueAccessor
{
  constructor(private fileUpload: FileUpload) {}

  file!:any;

  writeValue(value: any): void {
    // update the model and changes logic goes here
    this.file = value;
  }

  registerOnChange(fn: any): void {
    // notify the outside world about changes (when the user interacts with the input)
    this.fileUpload.onUpload.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // here goes the touch logic
    this.fileUpload.onClear.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.fileUpload.disabled = isDisabled;
  }
}
