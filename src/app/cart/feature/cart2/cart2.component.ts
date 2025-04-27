import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
import { CartStore } from '../../data-access/store/cart.store';
import { EmptyCartComponent } from '../../ui/empty-cart/empty-cart.component';
import { CartContentComponent } from '../../ui/cart-content/cart-content.component';
import { CartSpecialOfferComponent } from '../../ui/cart-special-offer/cart-special-offer.component';

@Component({
  selector: 'app-cart2',
  standalone: true,
  imports: [
    DialogModule,
    EmptyCartComponent,
    CartContentComponent,
    CartSpecialOfferComponent,
  ],
  templateUrl: './cart2.component.html',
  styleUrl: './cart2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart2Component {
  readonly cartModalStore = inject(CartModalStore);
  readonly cartStore = inject(CartStore);
  public data = this.cartStore.cartItems;
  public fullCost = this.cartStore.priceForAll;

  get isOpenedSignal() {
    return this.cartModalStore.isOpened();
  }
  set isOpenedSignal(value: boolean) {
    value ? this.cartModalStore.open() : this.cartModalStore.close();
  }
}
