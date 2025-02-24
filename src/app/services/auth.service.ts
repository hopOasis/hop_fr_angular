import { inject, Injectable, signal } from '@angular/core';
import { Login, Registration, Token } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { FetchedError } from '../models/fetched-error.model';
import { json } from 'stream/consumers';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken = signal<Token | null>(null);
  public BASE_URL = signal(environment.apiUrl);
  private httpClient = inject(HttpClient);

  userLogin(data: Login): Observable<Token | FetchedError> {
    console.log(this.BASE_URL());

    return this.httpClient
      .post<Token>(`${this.BASE_URL}/auth/login`, data)
      .pipe(
        catchError((error, obs) => {
          console.log(error);
          return throwError(() => new Error(error.statusText));
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
      .post<Token>(`${this.BASE_URL}/auth/register`, data)
      .pipe(
        catchError((error: HttpErrorResponse, obs) => {
          console.log(error);
          return throwError(() => new Error(error.statusText));
        }),
        tap({
          next: (data) => {
            this.accessToken.set(data);
          },
        })
      );
  }
}
