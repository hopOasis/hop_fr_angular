import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UpdateMeasurePipe } from '../../../catalog/utils/update-measure.pipe';
import { useCartActions } from '../../../utils/cart-actions';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [SpinnerComponent, UpdateMeasurePipe, FormsModule],
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent implements OnInit {
  // Inject the reusable logic
  private cartActions = useCartActions();

  // Expose signals and methods to the template
  public isLoading = this.cartActions.isLoading;
  public isDisabled = this.cartActions.isDisabled;
  public itemData = input.required<CartItemResponse>();
  public cartActionsAmount = this.cartActions.amount;
  public amount = computed(() => this.cartActionsAmount());

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
    this.cartActionsAmount.set(this.itemData().quantity);
    this.isDisabled.set(this.amount() <= 1);
  }

  // Delegate calls to the extracted logic
  onQuantityChange(item: CartItemResponse, amount: string) {
    this.cartActions.onQuantityChange(item, Number(amount));
  }

  increase(item: CartItemResponse) {
    this.cartActions.increase(item);
  }

  decrease(item: CartItemResponse) {
    // Pass current amount to help the logic decide
    this.cartActions.decrease(item, this.amount());
  }

  removeFromCart(cartItem: CartItemResponse) {
    this.cartActions.removeFromCart(cartItem);
  }
}
