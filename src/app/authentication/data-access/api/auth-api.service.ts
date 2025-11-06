import { inject, Injectable, Signal } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { AuthModalStore } from '../store/auth-modal.store';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private authStore = inject(AuthStore);
  private authModalStore = inject(AuthModalStore);
  private tokenService = inject(TokenService);
  get isAuth(): Signal<boolean> {
    return this.authStore.isAuth;
  }
  get accessToken(): Signal<string> {
    return this.authStore.access_token;
  }
  updateModalState(state: boolean): void {
    this.authModalStore.updateState(state);
  }
  get isOpenedModal(): Signal<boolean> {
    return this.authModalStore.isOpened;
  }
  logOut(): void {
    this.authStore.updateToken('');
    this.tokenService.setToken({ access_token: '' });
  }
  checkTokenInStore(): void {
    this.tokenService.checkTokenInStorage();
  }
}
