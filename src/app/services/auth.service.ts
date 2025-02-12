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

  userLogin(data: Login): Observable<Token | FetchedError> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/login`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            if (error.status === 404) {
              new Error('Server does not work.Try later!');
            } else if (error.status === 400) {
              new Error('Введіть правильні данні');
            }
          });
        }),
        tap({
          next: (data) => {
            this.accessToken.set(data);
          },
        })
      );
  }
  userRegistration(data: Registration): Observable<Token | FetchedError> {
    return this.httpClient
      .post<Token>(`${this.BASE_URL()}/auth/register`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            if (error.status === 404) {
              new Error('Server does not work.Try later!');
            } else if (error.status === 400) {
              new Error('Введіть правильні данні');
            }
          });
        }),
        tap({
          next: (data) => {
            this.accessToken.set(data);
          },
        })
      );
  }
}
