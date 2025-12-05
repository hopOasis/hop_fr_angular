import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../data-access/order.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderRes } from '../../interfaces/order.interface';
import { OrderItemComponent } from '../order-item/order-item.component';
import { getLastItem } from '../../utils/get-last-item';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss',
})
export class OrderItemsComponent implements OnInit {
  private orderService = inject(OrderService);
  private destroyRef = inject(DestroyRef);

  public orders = signal<OrderRes[]>([]);
  public getLastItem = getLastItem;

  public itemsHeader = [
    'Замовлення №',
    'Дата та час',
    'Статус',
    'Сумма',
    'Дії',
  ];

  ngOnInit(): void {
    this.orderService
      .getOrder()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((orders) => this.orders.set(orders));
  }
}
