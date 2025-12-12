import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MatIcon } from '@angular/material/icon';

import { OrderRes } from '../../interfaces/order.interface';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ORDERSTATUS } from '../../utils/order.config';
import { CartService } from '../../../cart/data-access/services/cart.service';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartStore } from '../../../cart/data-access/store/cart.store';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [ButtonComponent, OrderDetailsComponent, MatIcon],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  private router = inject(Router);
  private isAuth = inject(AuthApiService);
  public order = input.required<OrderRes>();
  public orderStatus = ORDERSTATUS;
  public isDetails = signal(false);

  showDetails(): void {
    this.isDetails.update((s) => (s = !s));
  }

  reorder(order: OrderRes) {
    order.items.forEach((item) => {
      this.cartService
        .addProduct(
          {
            quantity: item.quantity,
            itemId: item.itemId,
            itemType: item.itemType,
            measureValue: item.measureValue,
          },
          item.price,
          item.itemTitle,
          [item.imageName],
          item.measureValue,
          item.itemType,
          this.isAuth.isAuth()
        )
        .subscribe(() => {
          this.cartStore.triggerCartApdating(this.isAuth.isAuth());
          this.router.navigate(['/my_cabinet/cart']);
        });
    });
  }
}
