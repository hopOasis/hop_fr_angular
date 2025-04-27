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

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  public itemData = input.required<CartItemResponse>();
  private cartStore = inject(CartStore);

  onRemoveItem() {
    // this.cartStore.removeProductFromCart(this.itemData.itemId).subscribe({
    //   next: () => {
    //     // Handle success, for example: update UI or show a success message
    //     console.log('Product removed from cart');
    //   },
    //   error: (error) => {
    //     // Handle error, for example: show an error message
    //     console.error('Error removing product from cart', error);
    //   },
    // });
  }
}
