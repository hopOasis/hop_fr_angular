import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../../state/models/store.model';
import { switchMap, take, tap, throwError } from 'rxjs';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { CartResponse } from '../models/cart-response.model';
import { LocalCartService } from '../../local-cart/services/local-cart.service';
import { environment } from '../../../../../environments/environment';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { selectCartId } from '../../state/store/cart/cart.selectors';
@Injectable({ providedIn: 'root' })
export class CartService {
  private localCartService = inject(LocalCartService);
  private httpClient = inject(HttpClient);
  private store = inject<Store<StoreData>>(Store);
  private isAuth$ = this.store.select('auth');
  private cartId$ = this.store.select(selectCartId);
  getCartFromApi(): Observable<CartResponse | null> {
    return this.store.select('user').pipe(
      switchMap(({ userInfo }) => {
        if (userInfo)
          return this.httpClient.get<CartResponse>(
            `${environment.apiUrl}/carts`
          );
        else return of(null);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.statusText);
      })
    );
  }
  getProduct(): Observable<CartResponse | null> {
    return this.isAuth$.pipe(
      switchMap((isAuth) => {
        return isAuth.isAuth
          ? this.getCartFromApi()
          : of(this.localCartService.getCartData());
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.statusText);
      })
    );
  }
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
    itemTitle: string
  ): Observable<CartItemResponse> {
    return this.isAuth$.pipe(
      take(1),
      switchMap((isAuth) =>
        isAuth.isAuth
          ? this.addProductToApi(cart)
          : this.localCartService.addProduct(cart, itemCost, itemTitle)
      )
    );
  }
  removeProduct(productInfo: CartItemRemoveDto, price: number) {
    return combineLatest([this.isAuth$, this.cartId$]).pipe(
      take(1),
      switchMap(([isAuth, cartId]) =>
        isAuth.isAuth && cartId
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
