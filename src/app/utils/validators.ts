import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

const nameValidator = (name: RegExp): ValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const nameMatch = name.test(control.value);
    return of(nameMatch ? { forbiddenName: { value: control.value } } : null);
  };
};

const emailValidator = (email: RegExp): ValidatorFn | null => {
  // it should be checked
  return (control: AbstractControl): ValidationErrors | null =>
    email.test(control.value)
      ? { forbiddenEmail: { value: control.value } }
      : null;
};

const phoneValidator = (phone: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneMatch = phone.test(control.value);
    return phoneMatch ? { forbiddenPhone: { value: control.value } } : null;
  };
};

const validation = (value: string, regExp: RegExp) => regExp.test(value);

export { nameValidator, emailValidator, phoneValidator, validation };
