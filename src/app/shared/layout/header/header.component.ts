import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';
import { SearchBarComponent } from '../../ui/search-bar/feature/search-bar.component';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly authApiService = inject(AuthApiService);
  readonly cartApiService = inject(CartApiService);

  searchFocus = false;

  onOpenModal(isAuthorized: boolean) {
    if (!isAuthorized) this.authApiService.updateModalState(true);
  }

  openCartModal() {
    this.cartApiService.updateState(true);
  }

  searchOnFocus(value: boolean) {
    this.searchFocus = value;
  }
}
