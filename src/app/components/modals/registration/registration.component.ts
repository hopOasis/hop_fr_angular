import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private authService = inject(AuthService);
  public form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$'),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[А-Яа-яЇїІіЄєҐґ]+$'),
      Validators.maxLength(15),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[А-Яа-яЇїІіЄєҐґ]+$'),
      Validators.maxLength(15),
    ]),
  });
  public isShowedPassword = signal(false);
  onShowPassword() {
    this.isShowedPassword.set(true);
  }
  onHidePassword() {
    this.isShowedPassword.set(false);
  }
  onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const firstName = this.form.value.firstName;
    const lastName = this.form.value.lastName;
    if (email && password && firstName && lastName)
      this.authService
        .userRegistration({
          email,
          password,
          firstName,
          lastName,
        })
        .subscribe();
    this.form.reset();
  }
}
