import { Component, input, signal } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { OrderRes } from '../../interfaces/order.interface';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ORDERSTATUS } from '../../utils/order.config';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [ButtonComponent, OrderDetailsComponent, MatIcon],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
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
}
