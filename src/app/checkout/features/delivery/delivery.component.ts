import { Component, inject, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { OrderReciverComponent } from '../order-reciver/order-reciver.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { CheckoutService } from '../../data-access/checkout.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    InputComponent,
    CheckboxComponent,
    OrderReciverComponent,
    DeliveryTypeComponent,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
  providers: [CheckoutStoreService, CheckoutService],
})
export class DeliveryComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private checkoutService = inject(CheckoutService);

  isReceiver = signal(false);

  isChecked(event: boolean) {
    this.isReceiver.set(event);
  }

  makeOrder() {
    console.log(this.checkoutStore.getPaymentDataReq());
    // this.checkoutService.makeOrder(this.checkoutStore.getPaymentDataReq());
  }
}
