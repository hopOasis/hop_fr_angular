import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { CustomDatepickerComponent } from '../../../shared/custom-datepicker/custom-datepicker.component';

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
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent {
  public open: WritableSignal<boolean> = signal<boolean>(false);

  showCalendar() {
    if (this.open()) {
      this.open.set(false);
    } else {
      this.open.set(true);
    }
  }

  dateRange(range: string) {
    console.log(range);
  }
}
