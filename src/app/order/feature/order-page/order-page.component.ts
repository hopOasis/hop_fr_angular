import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomDatepickerComponent } from '../../../shared/ui/custom-datepicker/custom-datepicker.component';
import { OrderStore } from '../../data-access/order.store';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    ButtonComponent,
    OrderItemsComponent,
    MatIcon,
    CustomDatepickerComponent,
    SpinnerComponent,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  providers: [OrderStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent implements OnInit {
  public orderStore = inject(OrderStore);
  public open = signal<boolean>(false);
  public priceBy = signal<'abc' | 'desc' | null>('abc');
  public arrowActive = false;
  private dates = signal<any>([]);

  ngOnInit(): void {
    this.orderStore.loadOrders();
  }

  showCalendar(): void {
    if (this.open()) {
      this.open.set(false);
    } else {
      this.open.set(true);
    }
  }

  dateRange(range: string): void {
    this.dates.set([]);

    if (range !== null) {
      const from = new Date(range.split(' ').splice(0, 3).join(' '));
      const to = new Date(range.split(' ').splice(4, 6).join(' '));
      this.dates.update((items) => [from, to, ...items]);

      if (this.dates()[0] != 'Invalid Date') {
        this.orderStore.setDateRange(
          this.dates()[0],
          new Date(this.dates()[1].getTime() + 24 * 3600 * 1000)
        );
      }
    }
    if (range === 'reset') {
      this.orderStore.setDateRange(null, null);
    }
  }

  sortByPrice(): void {
    this.arrowActive = !this.arrowActive;
    if (this.priceBy() === 'abc') {
      this.orderStore.setSort(this.priceBy());
      this.priceBy.set('desc');
    } else if (this.priceBy() === 'desc') {
      this.orderStore.setSort(this.priceBy());
      this.priceBy.set(null);
      this.orderStore.loadOrders();
    } else {
      this.priceBy.set('abc');
    }
  }
}
