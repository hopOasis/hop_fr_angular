import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { CartStore } from '../../data-access/store/cart.store';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { UpdatePricePipe } from '../../../catalog/utils/update-price.pipe';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
import { AuthStore } from '../../../authentication/data-access/store/auth.store';

@Component({
  selector: 'app-cart-content',
  standalone: true,
  imports: [CartItemComponent, UpdatePricePipe],
  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContentComponent {
  private readonly cartModalStore = inject(CartModalStore);
  public readonly cartStore = inject(CartStore);
  readonly authStore = inject(AuthStore);
  private router = inject(Router);
  private currentUrl = this.router.url;

  continueShopping() {
    this.cartModalStore.close();

    if (!this.currentUrl.includes('/shop')) {
      setTimeout(() => {
        this.router.navigate(['/shop']);
      }, 50);
    }
  }

  makeOrder() {
    this.cartModalStore.close();

    if (!this.currentUrl.includes('/checkout')) {
      setTimeout(() => {
        this.router.navigate(['/checkout']);
      }, 50);
    }
  }
}
