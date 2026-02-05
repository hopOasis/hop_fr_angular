import { inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '../cart/data-access/services/cart.service';
import { CartStore } from '../cart/data-access/store/cart.store';
import { AuthApiService } from '../authentication/data-access/api/auth-api.service';
import { CartItemResponse } from '../cart/data-access/models/cart-item-response.model';

export function useCartActions() {
  const cartService = inject(CartService);
  const cartStore = inject(CartStore);
  const authService = inject(AuthApiService);
  const destroyRef = inject(DestroyRef);
  const snackBar = inject(MatSnackBar);

  const isLoading = signal(false);
  const isDisabled = signal(false);
  const amount = signal(1);

  const openSnackBar = (msg: string) => {
    snackBar.open(msg, 'Закрити', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  };

  const onQuantityChange = (cartItem: CartItemResponse, quantity: number) => {
    if (quantity % 1 !== 0) {
      openSnackBar('Кількість товару має бути цілим числом');
      return;
    }

    if (quantity >= 1) {
      const { cartId, itemId, measureValue, itemType } = cartItem;
      isLoading.set(true);
      isDisabled.set(quantity <= 1);
      amount.set(quantity);

      cartService
        .addExactAmount({
          cartId,
          items: [{ itemId, measureValue, itemType, quantity }],
        })
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe((res) => {
          cartStore.triggerCartApdating(authService.isAuth());
          isLoading.set(false);
        });
    } else {
      openSnackBar('Кількість товару не може бути менше 1');
    }
  };

  const increase = (cartItem: CartItemResponse) => {
    isLoading.set(true);
    isDisabled.set(false);

    cartService
      .addProductToApi({
        itemId: cartItem.itemId,
        measureValue: cartItem.measureValue,
        itemType: cartItem.itemType,
        quantity: 1,
      })
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((res) => {
        cartStore.triggerCartApdating(authService.isAuth());
        amount.set(res.quantity);
        isLoading.set(false);
      });
  };

  const decrease = (cartItem: CartItemResponse, currentAmount: number) => {
    if (currentAmount >= 2) {
      isLoading.set(true);
      cartService
        .addProductToApi({
          itemId: cartItem.itemId,
          measureValue: cartItem.measureValue,
          itemType: cartItem.itemType,
          quantity: -1,
        })
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe((res) => {
          isDisabled.set(res.quantity <= 1);
          cartStore.triggerCartApdating(authService.isAuth());
          amount.set(res.quantity);
          isLoading.set(false);
        });
    } else {
      isDisabled.set(true);
    }
  };

  const removeFromCart = (cartItem: CartItemResponse) => {
    const { itemId, measureValue, itemType } = cartItem;
    isLoading.set(true);
    cartService
      .removeProduct(
        { itemId, itemType, measureValue },
        cartItem.pricePerItem,
        authService.isAuth()
      )
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => {
        cartStore.triggerCartApdating(authService.isAuth());
        isLoading.set(false);
      });
  };

  return {
    isLoading,
    isDisabled,
    amount,
    onQuantityChange,
    increase,
    decrease,
    removeFromCart,
  };
}
