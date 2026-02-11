import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const nameRegEx =
  /^(?=.{3,30}$)[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+([-' ][А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+)*$/;
const phoneRegEx = /^\+380\d{9}$/;
const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const numberRegEx = /^[0-9]{1,4}$/;
const buildingRegEx = /^[0-9]{1,4}[А-ЩЬЮЯЄІЇҐ]?$/;
const departmentRegEx = /^[0-9]{5}$/;

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

export {
  customValidator,
  nameRegEx,
  phoneRegEx,
  emailRegEx,
  numberRegEx,
  buildingRegEx,
  departmentRegEx,
};
