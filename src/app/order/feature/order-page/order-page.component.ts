import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    ButtonComponent,
    OrderItemsComponent,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPageComponent {}
