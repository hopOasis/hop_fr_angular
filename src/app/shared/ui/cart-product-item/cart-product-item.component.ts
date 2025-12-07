import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { CartService } from '../../../cart/data-access/services/cart.service';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartStore } from '../../../cart/data-access/store/cart.store';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UpdateMeasurePipe } from '../../../catalog/utils/update-measure.pipe';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [SpinnerComponent, UpdateMeasurePipe, FormsModule],
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  private authService = inject(AuthApiService);
  public itemData = input.required<CartItemResponse>();
  public isLoading = signal(false);
  public isDisabled = signal(false);

  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  public amount = 1;

  get imageUrl(): string {
    return this.itemData()?.imageName[0] ?? '';
  }

  get quantity(): number {
    return this.itemData().quantity;
  }

  get measureValue(): number {
    return this.itemData()?.measureValue ?? 0;
  }

  ngOnInit(): void {
    this.amount = this.quantity;
    if (this.amount <= 1) {
      this.isDisabled.set(true);
    }
  }

  onQuantityChange(cartItem: CartItemResponse, quantity: number) {
    if (quantity % 1 !== 0) {
      this.openSnackBar('Кількість товару має бути цілим числом', 'Закрити');
      this.isLoading.set(false);
      return;
    } else if (quantity >= 1) {
      const { cartId, itemId, measureValue, itemType } = cartItem;
      this.isLoading.set(true);

      if (quantity <= 1) {
        this.isDisabled.set(true);
      } else {
        this.isDisabled.set(false);
      }

      this.cartService
        .addExactAmount({
          cartId,
          items: [{ itemId, measureValue, itemType, quantity }],
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.cartStore.triggerCartApdating(this.authService.isAuth());
          this.isLoading.set(false);
        });
    } else {
      this.openSnackBar('Кількість товару не може бути менше 1', 'Закрити');
    }
  }

  increase(cartItem: CartItemResponse): void {
    const { itemId, measureValue, itemType } = cartItem;

    const quantity = 1;
    this.isLoading.set(true);
    this.isDisabled.set(false);

    this.cartService
      .addProductToApi({
        itemId,
        measureValue,
        itemType,
        quantity,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.amount = res.quantity;
        this.cartStore.triggerCartApdating(this.authService.isAuth());
        this.isLoading.set(false);
      });
  }

  decrease(cartItem: CartItemResponse): void {
    const { itemId, measureValue, itemType } = cartItem;
    if (this.amount >= 2) {
      this.isLoading.set(true);
      this.isDisabled.set(false);
      this.cartService
        .addProductToApi({
          itemId,
          measureValue,
          itemType,
          quantity: -1,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.amount = res.quantity;
          if (this.amount <= 1) {
            this.isDisabled.set(true);
          } else {
            this.isDisabled.set(false);
          }
          this.cartStore.triggerCartApdating(this.authService.isAuth());
          this.isLoading.set(false);
        });
    } else {
      this.isDisabled.set(true);
    }
  }

  removeFromCart(cartItem: CartItemResponse) {
    console.log('remove');
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
