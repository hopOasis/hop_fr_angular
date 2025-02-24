import { inject, Injectable, signal } from '@angular/core';
import { Login, Registration, Token } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { FetchedError } from '../models/fetched-error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken = signal<Token | null>(null);
  public BASE_URL = signal(environment.apiUrl);
  private httpClient = inject(HttpClient);

  get token() {
    return this.accessToken();
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      switch (error.status) {
        case 404:
          return 'Схоже проблеми на сервері. Спробуйте пізніше.';
        case 400:
          if (!error.error || !(error.error as FetchedError).errors)
            return 'Виникла не відома помилка';
          return (
            (error.error as FetchedError).errors.email ||
            (error.error as FetchedError).errors.password ||
            'Виникла не відома помилка'
          );
        default:
          return 'Виникла не відома помилка';
      }
    });
  }
  handleAccessToken(token: Token) {
    this.accessToken.set(token);
  }
  userLogin(data: Login): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/login`, data)
      .pipe(
        catchError(this.handleError),
        tap(this.handleAccessToken.bind(this))
      );
  }
  userRegistration(data: Registration): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/register`, data)
      .pipe(
        catchError(this.handleError),
        tap(this.handleAccessToken.bind(this))
      );
  }

  refreshAccessToken(): Observable<Token> {
    return this.httpClient
      .get<Token>(`${this.BASE_URL()}/auth/refresh/token`)
      .pipe(tap(this.handleAccessToken.bind(this)));
  }
}
