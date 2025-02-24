import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FetchedError } from '../../../models/fetched-error.model';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../models/store.model';
import { logIn } from '../../../store/auth.actions';
import { Router } from '@angular/router';
import { hideLoginModal } from '../../../store/modal.actions';
import { ScrollService } from '../../../services/scroll.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private scrollService = inject(ScrollService);
  private router = inject(Router);
  public form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$'),
    ]),
  });
  public errorMessage = signal('');
  public isShowedPassword = signal(false);
  public isFetching = signal(false);
  constructor(public store: Store<StoreData>) {}
  onShowPassword() {
    this.isShowedPassword.set(true);
  }
  onHidePassword() {
    this.isShowedPassword.set(false);
  }
  onLogin() {
    let { email, password } = this.form.value;
    if (email && password) {
      this.isFetching.set(true);
      this.authService.userLogin({ email, password }).subscribe({
        next: (data) => {
          this.store.dispatch(logIn());
          this.store.dispatch(hideLoginModal());
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
