import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly authApiService = inject(AuthApiService);
  readonly cartApiService = inject(CartApiService);
  onOpenModal(isAuthorized: boolean) {
    if (!isAuthorized) this.authApiService.updateModalState(true);
  }
  openCartModal() {
    this.cartApiService.updateState(true);
  }
}
