import { Component, inject, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { OrderReciverComponent } from '../order-reciver/order-reciver.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { phoneParser } from '../../../utils/phone-parser';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    InputComponent,
    CheckboxComponent,
    OrderReciverComponent,
    DeliveryTypeComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
  providers: [CheckoutStoreService, CheckoutService],
})
export class DeliveryComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private checkoutService = inject(CheckoutService);
  private fb = inject(FormBuilder);
  public deliveryForm = this.fb.group({
    name: '',
    surname: '',
    phone: '',
    email: '',
  });
  isReceiver = signal(false);

  isChecked(event: boolean) {
    this.isReceiver.set(event);
  }

  makeOrder() {
    console.log(this.deliveryForm.value);
    console.log(this.checkoutStore.getPaymentDataReq());
    // this.checkoutService.makeOrder(this.checkoutStore.getPaymentDataReq());
  }
}
