import { Component, inject, input, signal } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { OrderRes } from '../../interfaces/order.interface';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ORDERSTATUS } from '../../utils/order.config';
import { CartService } from '../../../cart/data-access/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [ButtonComponent, OrderDetailsComponent, MatIcon],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  public order = input.required<OrderRes>();
  public orderStatus = ORDERSTATUS;
  public showMore = signal(false);

  showDetails() {
    if (this.showMore()) {
      this.showMore.set(false);
    } else {
      this.showMore.set(true);
    }
    console.log(this.order());
  }

  reorder(order: OrderRes) {
    order.items.forEach((item) => {
      this.cartService
        .addProductToApi({
          itemId: item.id,
          quantity: item.quantity,
          measureValue: item.measureValue,
          itemType: item.itemType,
        })
        .subscribe(() => this.router.navigate(['/my_cabinet/cart']));
    });
  }
}
