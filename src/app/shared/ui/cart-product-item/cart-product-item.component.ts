import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { CartService } from '../../../cart/data-access/services/cart.service';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartStore } from '../../../cart/data-access/store/cart.store';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UpdateMeasurePipe } from '../../../catalog/utils/update-measure.pipe';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [SpinnerComponent, UpdateMeasurePipe],
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent {
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  private authService = inject(AuthApiService);
  public itemData = input.required<CartItemResponse>();
  public isLoading = signal(false);

  get imageUrl(): string {
    return this.itemData()?.imageName[0] ?? '';
  }

  get quantity(): number {
    return this.itemData().quantity;
  }

  get measureValue(): number {
    return this.itemData()?.measureValue ?? 0;
  }

  increase(cartItem: CartItemResponse, q: number | undefined): void {
    const { itemId, measureValue, itemType } = cartItem;
    if (q) {
      const quantity = 1;
      this.isLoading.set(true);

      this.cartService
        .addProductToApi({
          itemId,
          measureValue,
          itemType,
          quantity,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.cartStore.triggerCartApdating(this.authService.isAuth());
          this.isLoading.set(false);
        });
    }
  }

  decrease(cartItem: CartItemResponse, q: number | undefined): void {
    const { itemId, measureValue, itemType } = cartItem;
    if (q && q > 0) {
      this.isLoading.set(true);
      this.cartService
        .addProductToApi({
          itemId,
          measureValue,
          itemType,
          quantity: -1,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.cartStore.triggerCartApdating(this.authService.isAuth());
          this.isLoading.set(false);
        });
    }
    if (q === 0) {
      this.removeFromCart(cartItem);
    }
  }

  removeFromCart(cartItem: CartItemResponse) {
    const { itemId, measureValue, itemType } = cartItem;
    this.isLoading.set(true);
    this.cartService
      .removeProduct(
        { itemId, itemType, measureValue },
        this.itemData().pricePerItem,
        this.authService.isAuth()
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cartStore.triggerCartApdating(this.authService.isAuth());
        this.isLoading.set(false);
      });
  }
}
