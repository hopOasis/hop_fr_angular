import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { CustomDatepickerComponent } from '../../../shared/ui/custom-datepicker/custom-datepicker.component';
import { OrderStore } from '../../data-access/order.store';
import { OrderRes } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    ButtonComponent,
    OrderItemsComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIcon,
    CustomDatepickerComponent,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  providers: [OrderStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent implements OnInit {
  private orderStore = inject(OrderStore);
  public open = signal<boolean>(false);

  ngOnInit(): void {
    this.orderStore.loadOrders();
  }

  showCalendar() {
    if (this.open()) {
      this.open.set(false);
    } else {
      this.open.set(true);
    }
  }

  dateRange(range: string) {
    const from = new Date(range.split(' ').splice(0, 3).join(' '));
    const to = new Date(range.split(' ').splice(4, 6).join(' '));

    this.orderStore.setDateRange(from, to);
  }

  sortByPrice() {
    this.orderStore.setSort('price');
  }
}
