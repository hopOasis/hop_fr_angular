import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, take, throwError } from 'rxjs';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { LocalCartService } from './local-cart.service';
import { environment } from '../../../../environments/environment';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartStore } from '../store/cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
  private localCartService = inject(LocalCartService);
  private httpClient = inject(HttpClient);
  readonly cartStore = inject(CartStore);
  addProductToApi(cart: CartItemAddDto): Observable<CartItemResponse> {
    return this.httpClient
      .post<CartItemResponse>(`${environment.apiUrl}/carts`, cart)
      .pipe(
        catchError(() => throwError(() => 'Не вдалось додати товар до корзини'))
      );
  }
  addProduct(
    cart: CartItemAddDto,
    itemCost: number,
    itemTitle: string,
    isAuth: boolean
  ): Observable<CartItemResponse> {
    return of(isAuth).pipe(
      take(1),
      switchMap((isAuth) =>
        isAuth
          ? this.addProductToApi(cart)
          : this.localCartService.addProduct(cart, itemCost, itemTitle)
      )
    );
  }
  removeProduct(
    productInfo: CartItemRemoveDto,
    price: number,
    isAuth: boolean
  ) {
    return combineLatest([of(isAuth), of(this.cartStore.cartId())]).pipe(
      take(1),
      switchMap(([isAuth, cartId]) =>
        isAuth && cartId
          ? this.removeProductFromApi(cartId, productInfo)
          : this.localCartService.removeProduct(productInfo, price)
      )
    );
  }
  removeProductFromApi(
    cartId: number,
    productInfo: CartItemRemoveDto
  ): Observable<string> {
    console.log(productInfo);

    return this.httpClient
      .delete<string>(`${environment.apiUrl}/carts/remove/${cartId}`, {
        body: productInfo,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(() => throwError(() => 'Не вдалось видалити товар')));
  }
}
