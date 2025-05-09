import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CartItemResponse } from '../../data-access/models/cart-item-response.model';
import { CartService } from '../../data-access/services/cart.service';
import { CartStore } from '../../data-access/store/cart.store';
import { ProductStore } from '../../../catalog/data-access/store/product.store';
import { UpdatePricePipe } from '../../../catalog/utils/update-price.pipe';

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

  onRemoveItem() {
    console.log(this.itemData());
    this.cartStore
      .removeCartItem({
        itemId: this.itemData().itemId,
        itemType: this.itemData().itemType,
        measureValue: 0.5,
      })
      .subscribe();
  }
  onChangeAmountOfItems(quantity: number) {
    console.log(quantity);
  }
}
