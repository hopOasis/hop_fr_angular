import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { CartService } from '../../../cart/data-access/services/cart.service';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartStore } from '../../../cart/data-access/store/cart.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent {
  private destroyRef = inject(DestroyRef);
  public itemData = input.required<CartItemResponse>();
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  private authService = inject(AuthApiService);

  get imageUrl(): string {
    return this.itemData()?.imageName[0];
  }

  get quantity(): number {
    return this.itemData().quantity;
  }

  get measureValue(): number {
    return this.itemData()?.measureValue;
  }

  increase(cartItem: CartItemResponse, q: number | undefined): void {
    const { itemId, measureValue, itemType } = cartItem;
    if (q) {
      const quantity = 1;

      this.cartService
        .addProductToApi({
          itemId,
          measureValue,
          itemType,
          quantity,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() =>
          this.cartStore.triggerCartApdating(this.authService.isAuth())
        );
    }
  }

  decrease(cartItem: CartItemResponse, q: number | undefined): void {
    const { itemId, measureValue, itemType } = cartItem;
    if (q && q > 0) {
      this.cartService
        .addProductToApi({
          itemId,
          measureValue,
          itemType,
          quantity: -1,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() =>
          this.cartStore.triggerCartApdating(this.authService.isAuth())
        );
    }
    if (q === 0) {
      this.removeFromCart(cartItem);
    }
  }

  removeFromCart(cartItem: CartItemResponse) {
    const { itemId, measureValue, itemType } = cartItem;
    this.cartService
      .removeProduct(
        { itemId, itemType, measureValue },
        this.itemData().pricePerItem,
        this.authService.isAuth()
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cartStore.triggerCartApdating(this.authService.isAuth());
      });
  }
}
