import { Component, inject } from '@angular/core';

import { OrderItemComponent } from '../order-item/order-item.component';
import { getLastItem } from '../../utils/get-last-item';
import { OrderStore } from '../../data-access/order.store';
import { itemsHeader } from '../../utils/order-headers.config';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss',
})
export class OrderItemsComponent {
  public orderStore = inject(OrderStore);
  public getLastItem = getLastItem;
  public itemsHeader = itemsHeader;
}
