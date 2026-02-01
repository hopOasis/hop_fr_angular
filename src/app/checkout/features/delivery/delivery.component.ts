import { Component, inject, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { OrderReciverComponent } from '../order-reciver/order-reciver.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  customValidator,
  emailRegEx,
  nameRegEx,
  phoneRegEx,
} from '../../utils/validator';

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

  public checkoutForm = this.fb.group({
    owner: this.fb.group({
      name: ['', [Validators.required, customValidator(nameRegEx)]],
      surname: ['', [Validators.required, customValidator(nameRegEx)]],
      phone: ['', [Validators.required, customValidator(phoneRegEx)]],
      email: ['', [Validators.required, customValidator(emailRegEx)]],
    }),
    receiver: this.fb.group({
      name: ['', [Validators.required, customValidator(nameRegEx)]],
      surname: ['', [Validators.required, customValidator(nameRegEx)]],
      phone: ['', [Validators.required, customValidator(phoneRegEx)]],
      email: ['', [Validators.required, customValidator(emailRegEx)]],
    }),
    deliveryType: this.fb.group({
      city: ['', [Validators.required, customValidator(nameRegEx)]],
      street: ['', [Validators.required, customValidator(nameRegEx)]],
      postCode: ['', [Validators.required]],
      building: ['', [Validators.required]],
      apartment: ['', [customValidator(nameRegEx)]],
    }),
  });
  public isReceiver = signal(false);

  isChecked(event: boolean) {
    this.isReceiver.set(event);
  }

  makeOrder() {
    console.log(this.checkoutForm.value);
    // this.checkoutService.makeOrder(this.checkoutStore.getPaymentDataReq());
  }
}
