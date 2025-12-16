import { Component, inject } from '@angular/core';
import { CartProductItemComponent } from '../../../shared/ui/cart-product-item/cart-product-item.component';
import { CartStore } from '../../../cart/data-access/store/cart.store';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CartProductItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  private cartStore = inject(CartStore);
  public data = this.cartStore.cartItems;
}
