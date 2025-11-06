import { ChangeDetectionStrategy, inject, OnInit, signal, viewChild } from '@angular/core';
import { Component, computed, ElementRef } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { Login, Register } from '../../data-access/models/auth.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { transition, trigger } from '@angular/animations';
import { animate, state, style } from '@angular/animations';
import { AuthService } from '../../data-access/services/auth.service';
import { AuthStore } from '../../data-access/store/auth.store';
import { TokenService } from '../../data-access/services/token.service';
import { take } from 'rxjs';
import { AuthModalStore } from '../../data-access/store/auth-modal.store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, ToastModule],
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
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private dialogWrapper =
    viewChild<ElementRef<HTMLDialogElement>>('dialogWrapper');
  private button = viewChild<ElementRef<HTMLButtonElement>>('buttonCloseModal');
  private formBuilder = inject(FormBuilder);
  public mode = signal<'login' | 'register'>('login');
  public errorMessage = signal('');
  public isShowedPassword = signal(false);
  public isActiveSpinner = signal(false);
  readonly authStore = inject(AuthStore);
  readonly authModalStore = inject(AuthModalStore);
  private tokenService = inject(TokenService);

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
  ngOnInit(): void {}
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
    ) {
      this.authModalStore.updateState(false);
      this.form().reset();
    }
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
    userAuthFunc.pipe(take(1)).subscribe({
      next: (token) => {
        this.authStore.updateToken(token.access_token);
        this.tokenService.setToken(token);
        this.router.navigate(['/my_cabinet']);
      },
      error: (error: string) => {
        this.errorMessage.set(error);
        this.form().reset();
        this.isActiveSpinner.set(false);
      },
      complete: () => {
        this.onShowSuccessMessage();
        this.authModalStore.updateState(false);
        this.form().reset();
        this.isActiveSpinner.set(false);
      },
    });
  }
}
