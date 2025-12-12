import { Component, input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { OrderRes } from '../../interfaces/order.interface';
import { DELIVERYMETHOD, PAYMENT } from '../../utils/order.config';
import { title } from '../../utils/order-headers.config';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MatIcon, ButtonComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  public order = input.required<OrderRes>();
  public deliveryMethod = DELIVERYMETHOD;
  public payment = PAYMENT;
  public titles = title;
}
