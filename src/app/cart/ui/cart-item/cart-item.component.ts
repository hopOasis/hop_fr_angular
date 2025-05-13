import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CartItemResponse } from '../../data-access/models/cart-item-response.model';
import { CartStore } from '../../data-access/store/cart.store';
import { UpdatePricePipe } from '../../../catalog/utils/update-price.pipe';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import untilDestroyed from '../../../catalog/utils/until-destroyed';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [UpdatePricePipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  public itemData = input.required<CartItemResponse>();
  private cartStore = inject(CartStore);
  private quantitySubject = new Subject<number>();
  private destroyed = untilDestroyed();

  constructor() {
    afterNextRender(() => {
      this.quantitySubject
        .pipe(debounceTime(400), distinctUntilChanged(), this.destroyed())
        .subscribe((quantity) => {
          this.cartStore
            .changeCartItemQuantity({
              itemId: this.itemData().itemId,
              itemType: this.itemData().itemType,
              measureValue: this.itemData().measureValue,
              quantity,
            })
            .subscribe();
        });
    });
  }

  onRemoveItem() {
    this.cartStore
      .removeCartItem({
        itemId: this.itemData().itemId,
        itemType: this.itemData().itemType,
        measureValue: this.itemData().measureValue,
      })
      .subscribe();
  }

  onChangeAmountOfItems(quantity: number) {
    if (quantity < 1) return;
    this.quantitySubject.next(quantity);
  }
}
