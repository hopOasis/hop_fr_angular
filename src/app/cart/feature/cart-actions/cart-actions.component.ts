import { Component, inject } from '@angular/core';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-actions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActionsComponent {
  private cartModalStore = inject(CartModalStore);
  private router = inject(Router);

  onCloseModal(): void {
    this.cartModalStore.updateState(false);
  }

  makeOrder(): void {
    this.onCloseModal();
    this.router.navigate(['/checkout']);
  }
}
