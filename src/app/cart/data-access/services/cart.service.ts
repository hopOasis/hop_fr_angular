import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError, catchError, Observable, defer } from 'rxjs';

import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { CartResponse } from '../models/cart-response.model';
import { environment } from '../../../environments/environment.prod';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private httpClient = inject(HttpClient);

  getCartItems(): Observable<CartResponse> {
    return this.httpClient
      .get<CartResponse>(`${environment.apiUrl}/carts`)
      .pipe(catchError(() => throwError(() => 'Не вдалось загрузити корзину')));
  }

  addCartItem(cart: CartItemAddDto): Observable<CartItemResponse> {
    return this.httpClient
      .post<CartItemResponse>(`${environment.apiUrl}/carts`, cart)
      .pipe(
        catchError(() => throwError(() => 'Не вдалось додати товар до корзини'))
      );
  }

  removeCartItem(
    cartId: number | null,
    productInfo: CartItemRemoveDto
  ): Observable<string> {
    return defer(() => {
      if (cartId === null) {
        return throwError(() => new Error('Invalid cart ID'));
      }

      return this.httpClient
        .delete<string>(`${environment.apiUrl}/carts/remove/${cartId}`, {
          body: productInfo,
          responseType: 'text' as 'json',
        })
        .pipe(
          catchError(() =>
            throwError(() => new Error('Не вдалось видалити товар'))
          )
        );
    });
  }

  changeCartItemQuantity(
    cartId: number | null,
    productInfo: CartItemAddDto
  ): Observable<string> {
    return defer(() => {
      if (cartId === null) {
        return throwError(() => new Error('Invalid cart ID'));
      }

      return this.httpClient
        .put<string>(
          `${environment.apiUrl}/carts/update/${cartId}`,
          productInfo,
          {
            responseType: 'text' as 'json',
          }
        )
        .pipe(
          catchError(() =>
            throwError(() => new Error('Не вдалось оновити кількість товару'))
          )
        );
    });
  }
}
