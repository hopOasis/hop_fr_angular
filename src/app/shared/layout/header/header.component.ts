import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartModalStore } from '../../../cart/data-access/store/cart-modal.store';
import { CartStore } from '../../../cart/data-access/store/cart.store';
import { AuthStore } from '../../../authentication/data-access/store/auth.store';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly authApiService = inject(AuthApiService);
  readonly cartModalStore = inject(CartModalStore);
  public readonly cartStore = inject(CartStore);
  private readonly authStore = inject(AuthStore);

  constructor() {
    effect(
      () => {
        this.authStore.isAuth()
          ? this.cartStore.loadCartItems()
          : this.cartStore.clearCart();
      },
      { allowSignalWrites: true }
    );
  }

  onOpenModal() {
    if (!this.authStore.isAuth()) this.authApiService.updateModalState(true);
  }

  openCartModal() {
    this.authStore.isAuth()
      ? this.cartModalStore.open()
      : this.authApiService.updateModalState(true);
  }
}
