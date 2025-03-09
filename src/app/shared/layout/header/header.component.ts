import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { selectAuthState } from '../../../core/data-access/state/store/auth/auth.selectors';
import { authModal } from '../../../core/data-access/state/store/auth-modal/auth-modal.actions';
import { selectCartAmount } from '../../../core/data-access/state/store/cart/cart.selectors';
import { cartModalState } from '../../../core/data-access/state/store/cart-modal/cart-modal.actions';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject<Store<StoreData>>(Store);
  public isAuth$ = this.store.select(selectAuthState);
  public cartAmount$ = this.store.select(selectCartAmount);

  onOpenModal(isAuthorized: boolean) {
    if (!isAuthorized) this.store.dispatch(authModal({ isOpened: true }));
  }
  openCartModal() {
    this.store.dispatch(cartModalState({ isOpened: true }));
  }
}
