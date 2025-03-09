import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../../state/models/store.model';
import { updateToken } from '../../state/store/token/token.actions';
import { ParsedToken, Token } from '../models/token.model';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private store = inject<Store<StoreData>>(Store);
  private tokenTimer: null | NodeJS.Timeout = null;
  checkTokenInStorage(): void {
    const token = window.sessionStorage.getItem('access_token');
    const parsedToken: Token = token
      ? (JSON.parse(token) as Token)
      : { access_token: '' };
    this.store.dispatch(updateToken({ token: parsedToken }));
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
      this.store.dispatch(updateToken({ token: { access_token: '' } }));
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
