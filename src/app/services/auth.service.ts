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
      if (error.status === 404) {
        return new Error('Схоже проблеми на сервері. Спробуйте пізніше.');
      } else if (error.status === 400) {
        return error.error as FetchedError;
      } else return new Error('Щось сталося))');
    });
  }
  userLogin(data: Login): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/login`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error)),
        tap({
          next: (data) => {
            this.accessToken.set(data);
          },
        })
      );
  }
  userRegistration(data: Registration): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/register`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error)),
        tap({
          next: (data) => {
            this.accessToken.set(data);
          },
        })
      );
  }
  checkAccessToken(): Observable<string> {
    return this.httpClient.get<string>(`${this.BASE_URL()}/health`);
  }
  refreshAccessToken(): Observable<Token> {
    return this.httpClient.get<Token>(`${this.BASE_URL()}/auth/refresh/token`);
  }
}
