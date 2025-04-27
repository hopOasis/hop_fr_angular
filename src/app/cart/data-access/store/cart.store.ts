import { patchState, withMethods, withState } from '@ngrx/signals';
import { signalStore, withComputed } from '@ngrx/signals';
import { CartResponse } from '../models/cart-response.model';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CartDataService } from '../services/cart-data.service';

const initialState: { cartDetails: CartResponse | null; loading: boolean } = {
  cartDetails: null,
  loading: false,
};
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, cartDataService = inject(CartDataService)) => ({
    triggerCartApdating: rxMethod<boolean>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((data) => cartDataService.getProduct(data)),
        tapResponse({
          next: (data) => {
            patchState(store, {
              cartDetails: data,
              loading: false,
            });
          },
          error: () => {
            patchState(store, {
              cartDetails: null,
              loading: false,
            });
            console.error('Корзина пуста або не вдалося отримати данні');
          },
        })
      )
    ),
  })),
  withComputed(({ cartDetails }) => ({
    cartId: computed(() => cartDetails()?.items[0]?.cartId ?? 0),
    amountOfItems: computed(() => cartDetails()?.items.length ?? 0),
    cartItems: computed(() => cartDetails()?.items ?? []),
    priceForAll: computed(() =>
      cartDetails() ? cartDetails()!.priceForAll : 0
    ),
  }))
);
