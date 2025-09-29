import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
import { CartStore } from '../../data-access/store/cart.store';
import { EmptyCartComponent } from '../../ui/empty-cart/empty-cart.component';
import { CartContentComponent } from '../../ui/cart-content/cart-content.component';
import { CartSpecialOfferComponent } from '../../ui/cart-special-offer/cart-special-offer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DialogModule,
    EmptyCartComponent,
    CartContentComponent,
    CartSpecialOfferComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartModalStore = inject(CartModalStore);
  readonly cartStore = inject(CartStore);

  get isOpenedSignal() {
    return this.cartModalStore.isOpened();
  }
  set isOpenedSignal(value: boolean) {
    value ? this.cartModalStore.open() : this.cartModalStore.close();
  }
}
