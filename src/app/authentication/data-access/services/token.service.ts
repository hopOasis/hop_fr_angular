import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ParsedToken, Token } from '../models/token.model';
import { AuthStore } from '../store/auth.store';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private authStore = inject(AuthStore);
  private tokenTimer: null | NodeJS.Timeout = null;
  private platformId = inject(PLATFORM_ID);
  checkTokenInStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.sessionStorage.getItem('access_token');
      const parsedToken: Token = token
        ? (JSON.parse(token) as Token)
        : { access_token: '' };
      this.authStore.updateToken(parsedToken.access_token);
      this.setToken(parsedToken);
    }
  }
  setToken(token: Token): void {
    const tokenExpiration = this.getTokenExpiration(token.access_token);
    const tokenInfo: Token = {
      access_token: token.access_token,
    };
    window.sessionStorage.setItem('access_token', JSON.stringify(tokenInfo));
    if (this.tokenTimer) clearTimeout(this.tokenTimer);
    if (tokenExpiration) this.autoDeleteToken(tokenExpiration);
  }
  autoDeleteToken(expirationDate: number): void {
    this.tokenTimer = setTimeout(() => {
      this.authStore.updateToken('');
      this.setToken({ access_token: '' });
    }, expirationDate - Date.now());
  }
  parseAccessToken(token: string): null | ParsedToken {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
  getTokenExpiration(token: string): number {
    if (!token) return 0;
    const payload = this.parseAccessToken(token);
    if (payload) return payload.exp * 1000;
    return 0;
  }
}
