import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartStore } from '../../../cart/data-access/store/cart.store';
import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { useCartActions } from '../../../utils/cart-actions';
import { SelectOption } from '../../../shared/interfaces/select-option.interface';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { MatIcon } from '@angular/material/icon';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, InputComponent, MatIcon, SpinnerComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  // Inject the reusable logic
  private cartActions = useCartActions();

  // Expose signals and methods to the template
  public isLoading = this.cartActions.isLoading;
  public isDisabled = this.cartActions.isDisabled;
  public cartActionsAmount = this.cartActions.amount;
  public amount = computed(() => this.cartActionsAmount());
  private cartStore = inject(CartStore);

  public priceForAll = this.cartStore.priceForAll;
  public data = this.cartStore.cartItems;
  public selectOptions: SelectOption[] = [
    { value: '0.3', text: '0.3', selected: false },
    { value: '0.5', text: '0.5', selected: false },
  ];
  public promoCode = '';
  public discount = signal(0);
  public deliveryPrice = signal(0);
  public disabledInput = signal(false);

  public totalCost = computed((): number => {
    const toRound = this.discount()
      ? this.cartStore.priceForAll() / (this.discount() / 100 + 1) +
        this.deliveryPrice()
      : this.cartStore.priceForAll() + this.deliveryPrice();
    return Math.round(toRound * 100) / 100;
  });

  ngOnInit(): void {
    this.isDisabled.set(this.amount() <= 1);
  }

  applyPromoCode() {
    if (this.promoCode === '111') {
      this.discount.set(10);
      this.disabledInput.set(true);
    } else {
      this.discount.set(0);
      this.disabledInput.set(false);
    }
  }

  // Delegate calls to the extracted logic
  onQuantityChange(item: CartItemResponse, amount: string) {
    this.cartActions.onQuantityChange(item, Number(amount));
  }

  increase(item: CartItemResponse) {
    this.cartActions.increase(item);
  }

  decrease(item: CartItemResponse, amount: number) {
    // Pass current amount to help the logic decide
    this.cartActions.decrease(item, amount);
  }

  removeFromCart(cartItem: CartItemResponse) {
    this.cartActions.removeFromCart(cartItem);
  }
}
