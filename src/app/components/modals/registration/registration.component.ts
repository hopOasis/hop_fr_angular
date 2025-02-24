import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FetchedError } from '../../../models/fetched-error.model';
import { StoreData } from '../../../models/store.model';
import { Store } from '@ngrx/store';
import { logIn } from '../../../store/auth.actions';
import { Router } from '@angular/router';
import { hideRegisterModal } from '../../../store/modal.actions';
import { ScrollService } from '../../../services/scroll.service';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  animations: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  public isFetching = signal(false);
  private scrollService = inject(ScrollService);
  private router = inject(Router);

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
  public errorMessage = signal('');
  public isShowedPassword = signal(false);
  constructor(private store: Store<StoreData>) {}
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
    if (email && password && firstName && lastName) {
      this.isFetching.set(true);
      this.authService
        .userRegistration({
          email,
          password,
          firstName,
          lastName,
        })
        .subscribe({
          next: (data) => {
            this.store.dispatch(logIn());
            this.store.dispatch(hideRegisterModal());
            this.scrollService.addScroll();
            this.isFetching.set(false);
            this.router.navigate(['/my_cabinet']);
          },
          error: (error: Error | FetchedError) => {
            this.isFetching.set(false);
            if (error instanceof Error) {
              this.errorMessage.set(error.message);
            } else {
              this.errorMessage.set(
                error.errors.password ?? error.errors.email ?? ''
              );
            }
            setTimeout(() => {
              this.errorMessage.set('');
              this.form.reset();
            }, 3000);
          },
          complete: () => {
            this.isFetching.set(false);
            this.form.reset();
          },
        });
    }
  }
}
