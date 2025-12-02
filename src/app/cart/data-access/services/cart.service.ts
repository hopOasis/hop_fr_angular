import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, take, throwError } from 'rxjs';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { LocalCartService } from './local-cart.service';
import { environment } from '../../../environments/environment.prod';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartStore } from '../store/cart.store';
import { ProductType } from '../../../catalog/data-access/models/product-types.model';
import { CartPut } from '../models/cart-put.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private localCartService = inject(LocalCartService);
  private httpClient = inject(HttpClient);
  readonly cartStore = inject(CartStore);
  private readonly URL = environment.apiUrl;

  addProductToApi(cart: CartItemAddDto): Observable<CartItemResponse> {
    return this.httpClient
      .post<CartItemResponse>(`${this.URL}/carts`, cart)
      .pipe(
        catchError(() => throwError(() => 'Не вдалось додати товар до корзини'))
      );
  }

  addExactAmount(cart: CartPut): Observable<CartItemResponse> {
    return this.httpClient
      .put<CartItemResponse>(`${this.URL}/carts`, cart)
      .pipe(
        catchError(() => throwError(() => 'Не вдалось додати товар до корзини'))
      );
  }

  addProduct(
    cart: CartItemAddDto,
    itemCost: number,
    itemTitle: string,
    imageName: string[],
    measureValue: number,
    itemType: ProductType,
    isAuth: boolean
  ): Observable<CartItemResponse> {
    return of(isAuth).pipe(
      take(1),
      switchMap((isAuth) =>
        isAuth
          ? this.addProductToApi(cart)
          : this.localCartService.addProduct(
              cart,
              itemCost,
              itemTitle,
              imageName,
              measureValue,
              itemType
            )
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
    return this.httpClient
      .delete<string>(`${environment.apiUrl}/carts/remove/${cartId}`, {
        body: productInfo,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(() => throwError(() => 'Не вдалось видалити товар')));
  }
}
