import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CartStore } from '../../data-access/store/cart.store';

@Component({
  selector: 'app-cart-content',
  standalone: true,
  imports: [],
  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContentComponent {
  readonly cartStore = inject(CartStore);
  public data = this.cartStore.cartItems;
  public fullCost = this.cartStore.priceForAll;
}
