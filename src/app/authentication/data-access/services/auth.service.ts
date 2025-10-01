import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Login, Register } from '../models/auth.model';
import { Token } from '../models/token.model';
import { environment } from '../../../environments/environment.prod';
import { FetchedError } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  userLogin(userData: Login): Observable<Token> {
    return this.handleAuthRequest(
      this.httpClient.post<Token>(`${environment.apiUrl}/auth/login`, userData)
    );
  }
  userRegister(userData: Register): Observable<Token> {
    return this.handleAuthRequest(
      this.httpClient.post<Token>(
        `${environment.apiUrl}/auth/register`,
        userData
      )
    );
  }
  handleAuthRequest(obs: Observable<Token>) {
    return obs.pipe(
      take(1),
      catchError((error: HttpErrorResponse) =>
        throwError(() => this.handleError(error))
      )
    );
  }

  handleError(error: HttpErrorResponse) {
    const statusCode = error.status;
    switch (statusCode) {
      case 500:
        return 'Сталася внутрішня помилка сервера.Будь ласка, спробуйте пізніше';
      case 404:
        return 'Користувача не знайдено. Перевірте введенні дані та спробуйте ще';
      case 401:
        return 'Не вірний email або пароль!';
      case 400: {
        let message = (error.error as FetchedError).errors;
        return (
          message.firstName ||
          message.lastName ||
          message.email ||
          message.password ||
          'Перевірте введенні дані та спробуйте ще'
        );
      }
      default:
        return 'Сталася не відома помилка. Будь ласка, спробуйте ще';
    }
  }
}
