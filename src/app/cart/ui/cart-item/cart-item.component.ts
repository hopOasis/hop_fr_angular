import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
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
  public quantity = signal(1);
  private quantitySubject = new Subject<number>();
  private destroyed = untilDestroyed();

  constructor() {
    afterNextRender(() => {
      this.quantity.set(this.itemData().quantity);

      this.quantitySubject
        .pipe(debounceTime(400), distinctUntilChanged(), this.destroyed())
        .subscribe((quantity) => {
          this.cartStore
            .changeCartItemQuantity?.(
              this.cartStore.items().map((el) =>
                el.itemId === this.itemData().itemId &&
                el.measureValue === this.itemData().measureValue
                  ? {
                      ...el,
                      quantity,
                      totalCost: this.itemData().pricePerItem * quantity,
                    }
                  : el
              )
            )
            ?.subscribe();
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

  onChangeAmountOfItems(newQuantity: number) {
    if (newQuantity < 1) return;
    this.quantity.set(newQuantity);
    this.quantitySubject.next(newQuantity);
  }
}
