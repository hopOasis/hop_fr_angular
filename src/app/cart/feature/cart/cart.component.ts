import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UpdatePricePipe } from '../../../catalog/utils/update-price.pipe';
import { RouterLink } from '@angular/router';
import { CartProductItemComponent } from '../../../shared/ui/cart-product-item/cart-product-item.component';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
import { CartStore } from '../../data-access/store/cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductItemComponent, UpdatePricePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartModalStore = inject(CartModalStore);
  readonly cartStore = inject(CartStore);
  public data = this.cartStore.cartItems;
  public fullCost = this.cartStore.priceForAll;

  onCloseModal() {
    this.cartModalStore.close();
  }
}
