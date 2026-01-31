import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const nameRegEx =
  /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]{3,30}(-[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]{1,29})?$/;
const phoneRegEx = /^\+380\d{9}$/;
const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

const customValidator = (regEx: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !regEx.test(control.value)
      ? { customError: { value: control.value } }
      : null;
  };
};

export { customValidator, nameRegEx, phoneRegEx, emailRegEx };
