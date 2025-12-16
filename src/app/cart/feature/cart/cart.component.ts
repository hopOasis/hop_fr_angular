import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CartProductItemComponent } from '../../../shared/ui/cart-product-item/cart-product-item.component';
import { UpdatePricePipe } from '../../../catalog/utils/update-price.pipe';
import { CartStore } from '../../data-access/store/cart.store';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { CartActionsComponent } from '../cart-actions/cart-actions.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartProductItemComponent,
    UpdatePricePipe,
    SpinnerComponent,
    CartActionsComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartStore = inject(CartStore);

  public data = this.cartStore.cartItems;
  public fullCost = this.cartStore.priceForAll;
}
