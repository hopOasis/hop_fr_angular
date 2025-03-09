import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { triggerCartApdating, updateCart } from './cart.actions';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { StoreData } from '../../models/store.model';
import { Store } from '@ngrx/store';
import { CartResponse } from '../../../cart/models/cart-response.model';

@Injectable()
export class CartEffects {
  private cartService = inject(CartService);
  private actions$ = inject<Actions>(Actions);
  private store = inject<Store<StoreData>>(Store);
  fetchCartInfo = createEffect(
    () =>
      this.actions$.pipe(
        ofType(triggerCartApdating),
        switchMap(() => {
          return this.cartService.getProduct().pipe(
            tap((data) => {
              let newData: { cartDetails: null | CartResponse } = {
                cartDetails: null,
              };
              if (data) newData = { cartDetails: data };
              this.store.dispatch(updateCart(newData));
            }),
            catchError((error, obs) =>
              throwError(() => {
                this.store.dispatch(updateCart({ cartDetails: null }));
                return 'Корзина пуста або не вдалося отримати данні';
              })
            )
          );
        })
      ),
    { dispatch: false }
  );
}
