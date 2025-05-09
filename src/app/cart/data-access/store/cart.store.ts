import { patchState, withMethods, withState } from '@ngrx/signals';
import { signalStore, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartApiService } from '../api/cart-api.service';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';

interface ICartStore {
  items: CartItemResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ICartStore = {
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
          console.log(response);
          patchState(store, { items: response.items, isLoading: false });
        },
        error: (err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
        },
      });
    },
    addCartItem(cartItem: CartItemResponse) {
      patchState(store, { isLoading: true, error: null });

      const input: CartItemAddDto = {
        itemId: cartItem.itemId,
        itemType: cartItem.itemType,
        measureValue: cartItem.measureValue,
        quantity: cartItem.quantity,
      };

      cartApiService.addCartItem(input).subscribe({
        next: (newItem) => {
          const currentItems = store.items();
          const existingItemIndex = currentItems.findIndex(
            (item) => item.itemId === newItem.itemId
          );

          let updatedItems;
          if (existingItemIndex > -1) {
            updatedItems = currentItems.map((item) =>
              item.itemId === newItem.itemId
                ? {
                    ...item,
                    quantity: item.quantity + newItem.quantity,
                    totalCost: item.totalCost + newItem.totalCost,
                  }
                : item
            );
          } else {
            updatedItems = [...currentItems, newItem];
          }

          patchState(store, { items: updatedItems, isLoading: false });
        },
        error: (err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
        },
      });
    },

    removeCartItem({
      cartId,
      removeDto,
    }: {
      cartId: number;
      removeDto: CartItemRemoveDto;
    }) {
      patchState(store, { isLoading: true, error: null });
      cartApiService.removeCartItem(cartId, removeDto).subscribe({
        next: () => {
          const updatedItems = store
            .items()
            .filter((item) => item.itemId !== removeDto.itemId);
          patchState(store, { items: updatedItems, isLoading: false });
        },
        error: (err) => {
          patchState(store, {
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
        },
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
