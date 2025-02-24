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
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  public form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$'),
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
    let email = this.form.value.email;
    let password = this.form.value.password;
    if (email && password) this.authService.userLogin({ email, password }).subscribe()

    this.form.reset();
  }
}
