import { patchState, withMethods, withState } from '@ngrx/signals';
import { signalStore, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartApiService } from '../api/cart-api.service';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { catchError, tap, throwError } from 'rxjs';

interface ICartStore {
  cartId: number | null;
  items: CartItemResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ICartStore = {
  cartId: null,
  items: [],
  isLoading: false,
  error: null,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, cartApiService = inject(CartApiService)) => ({
    loadCartItems() {
      patchState(store, { isLoading: true, error: null });
      cartApiService.getCartItems().subscribe({
        next: (response) => {
          patchState(store, {
            items: response.items,
            isLoading: false,
            cartId: response.cartId,
          });
        },
        error: (err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
        },
      });
    },
    addCartItem(cartItem: CartItemAddDto) {
      patchState(store, { isLoading: true, error: null });

      return cartApiService.addCartItem(cartItem).pipe(
        tap((newItem) => {
          const currentItems = store.items();
          const existingItemIndex = currentItems.findIndex(
            (item) =>
              item.itemId === newItem.itemId &&
              item.measureValue === newItem.measureValue
          );
          const updatedItems =
            existingItemIndex > -1
              ? currentItems.map((item) =>
                  item.itemId === newItem.itemId &&
                  item.measureValue === newItem.measureValue
                    ? {
                        ...item,
                        quantity: item.quantity + newItem.quantity,
                        totalCost: item.totalCost + newItem.totalCost,
                      }
                    : item
                )
              : [...currentItems, newItem];

          patchState(store, { items: updatedItems, isLoading: false });
        }),
        catchError((err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
          return throwError(() => err);
        })
      );
    },
    removeCartItem(removeDto: CartItemRemoveDto) {
      const cartId = store.cartId();

      patchState(store, { isLoading: true, error: null });

      return cartApiService.removeCartItem(cartId, removeDto).pipe(
        tap(() => {
          const updatedItems = store
            .items()
            .filter(
              (item) =>
                !(
                  item.itemId === removeDto.itemId &&
                  item.measureValue === removeDto.measureValue
                )
            );

          patchState(store, { items: updatedItems, isLoading: false });
        }),
        catchError((err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
          return throwError(() => err);
        })
      );
    },
    changeCartItemQuantity(items?: CartItemResponse[]) {
      const cartId = store.cartId();

      if (!cartId || !items) return;

      patchState(store, { isLoading: true, error: null });
      const updatedItems: CartItemAddDto[] = items.map((item) => ({
        itemId: item.itemId,
        itemType: item.itemType,
        measureValue: item.measureValue,
        quantity: item.quantity,
      }));

      return cartApiService.changeCartItemQuantity(cartId, updatedItems).pipe(
        tap(() => {
          patchState(store, { items, isLoading: false });
        }),
        catchError((err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
          return throwError(() => err);
        })
      );
    },
    clearCart() {
      patchState(store, {
        cartId: null,
        items: [],
        isLoading: false,
        error: null,
      });
    },
  })),

  withComputed((store) => ({
    totalItems: computed(() =>
      store.items().reduce((acc, el) => acc + el.quantity, 0)
    ),
    totalPrice: computed(() =>
      store.items().reduce((acc, el) => acc + el.totalCost, 0)
    ),
  }))
);
