import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export const platformIncludedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const platform = formGroup.get('platform');
    const url = formGroup.get('url');
    return url?.value === "red" ? { platformIncludedValidator: true } : null;
};