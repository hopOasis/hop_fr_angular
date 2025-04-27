import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartModalStore } from '../../../cart/data-access/store/cart-modal.store';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';

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
  readonly cartApiService = inject(CartApiService);

  onOpenModal(isAuthorized: boolean) {
    if (!isAuthorized) this.authApiService.updateModalState(true);
  }
  openCartModal() {
    this.cartModalStore.open();
  }
}
