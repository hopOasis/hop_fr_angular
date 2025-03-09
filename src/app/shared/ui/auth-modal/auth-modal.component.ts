import { inject, OnInit, signal, viewChild } from '@angular/core';
import { Component, computed, DestroyRef, ElementRef } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { AsyncPipe } from '@angular/common';
import { authModal } from '../../../core/data-access/state/store/auth-modal/auth-modal.actions';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from '../../../core/data-access/auth/services/auth.service';
import {
  Login,
  Register,
} from '../../../core/data-access/auth/models/auth.model';
import { updateToken } from '../../../core/data-access/state/store/token/token.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, SpinnerComponent, ToastModule],
  animations: [
    trigger('authModal', [
      state(
        'open',
        style({
          'z-index': '50',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          scale: 0,
          width: 0,
          height: 0,
          'z-index': '-50',
          top: '50%',
          left: '50%',
        })
      ),
      transition('open => close', animate(200)),
      transition('close => open', animate(200)),
    ]),
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
  providers: [MessageService],
})
export class AuthModalComponent implements OnInit {
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private dialogWrapper =
    viewChild<ElementRef<HTMLDialogElement>>('dialogWrapper');
  private button = viewChild<ElementRef<HTMLButtonElement>>('buttonCloseModal');
  private store = inject<Store<StoreData>>(Store);
  public isOpened$ = this.store.select('authModal');
  private formBuilder = inject(FormBuilder);
  public mode = signal<'login' | 'register'>('login');
  public errorMessage = signal('');
  public isShowedPassword = signal(false);
  public isActiveSpinner = signal(false);

  public form = computed(() => {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$'),
      ]),
      ...(this.mode() === 'register' && {
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
      }),
    });
  });
  onShowSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Вхід успішний!',
    });
  }
  ngOnInit(): void {
    const isOpenedSubscription = this.isOpened$.subscribe(() =>
      this.form().reset()
    );
    this.destroyRef.onDestroy(() => isOpenedSubscription.unsubscribe());
  }
  onShowPassword() {
    this.isShowedPassword.set(true);
  }
  onHidePassword() {
    this.isShowedPassword.set(false);
  }
  onCloseModal(event: MouseEvent) {
    if (this.isActiveSpinner()) return;
    if (
      event.target === this.dialogWrapper()?.nativeElement ||
      event.target === this.button()?.nativeElement
    )
      this.store.dispatch(authModal({ isOpened: false }));
  }

  onAuth() {
    const authInfo = {
      ...this.form().value,
    };
    const userAuthFunc =
      this.mode() === 'login'
        ? this.authService.userLogin(authInfo as Login)
        : this.authService.userRegister(authInfo as Register);
    this.isActiveSpinner.set(true);
    const authSubscription = userAuthFunc.subscribe({
      next: (token) => {
        this.store.dispatch(updateToken({ token }));
      },
      error: (error: string) => {
        this.errorMessage.set(error);
        this.form().reset();
        this.isActiveSpinner.set(false);
      },
      complete: () => {
        this.onShowSuccessMessage();
        this.store.dispatch(authModal({ isOpened: false }));
        this.form().reset();
        this.isActiveSpinner.set(false);
      },
    });
    this.destroyRef.onDestroy(() => authSubscription.unsubscribe());
  }
}
