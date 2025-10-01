import { inject, Injectable } from '@angular/core';
import { LocalCartService } from './local-cart.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { CartResponse } from '../models/cart-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartDataService {
  private httpClient = inject(HttpClient);
  private localCartService = inject(LocalCartService);
  getCartFromApi(): Observable<CartResponse | null> {
    return this.httpClient
      .get<CartResponse>(`${environment.apiUrl}/carts`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error.statusText);
        })
      );
  }
  getProduct(isAuth: boolean): Observable<CartResponse | null> {
    return of(isAuth).pipe(
      switchMap((isAuth) =>
        isAuth ? this.getCartFromApi() : of(this.localCartService.getCartData())
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.statusText);
      })
    );
  }
}
