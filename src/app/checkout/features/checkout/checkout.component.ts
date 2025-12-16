import { Component,  } from '@angular/core';
import { DeliveryComponent } from '../delivery/delivery.component';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [DeliveryComponent, OrderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  
}
