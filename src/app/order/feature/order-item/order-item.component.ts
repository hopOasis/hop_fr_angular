import { Component, input } from '@angular/core';
import { OrderRes } from '../../interfaces/order.interface';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  order = input.required<OrderRes>();
}
