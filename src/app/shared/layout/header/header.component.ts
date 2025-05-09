import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartModalStore } from '../../../cart/data-access/store/cart-modal.store';
import { CartStore } from '../../../cart/data-access/store/cart.store';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly authApiService = inject(AuthApiService);
  readonly cartModalStore = inject(CartModalStore);
  public readonly cartStore = inject(CartStore);

  onOpenModal(isAuthorized: boolean) {
    if (!isAuthorized) this.authApiService.updateModalState(true);
  }
  openCartModal(isAuthorized: boolean) {
    isAuthorized
      ? this.cartModalStore.open()
      : this.authApiService.updateModalState(true);
  }

  ngOnInit(): void {
    this.cartStore.loadCartItems();
  }
}
