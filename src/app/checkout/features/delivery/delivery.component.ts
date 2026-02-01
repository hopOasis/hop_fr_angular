import { Component, computed, inject, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { OrderReciverComponent } from '../order-reciver/order-reciver.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  buildingRegEx,
  customValidator,
  departmentRegEx,
  emailRegEx,
  nameRegEx,
  numberRegEx,
  phoneRegEx,
} from '../../utils/validator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    InputComponent,
    CheckboxComponent,
    OrderReciverComponent,
    DeliveryTypeComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
  providers: [CheckoutStoreService, CheckoutService],
})
export class DeliveryComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private checkoutService = inject(CheckoutService);
  private fb = inject(FormBuilder);

  public paymentType = computed(
    () => this.checkoutStore.getPaymentDataReq().paymentType,
  );
  public isReceiver = signal(false);
  public checkoutForm = this.fb.group({
    owner: this.fb.group({
      name: ['', [Validators.required, customValidator(nameRegEx)]],
      surname: ['', [Validators.required, customValidator(nameRegEx)]],
      phone: ['+3806', [Validators.required, customValidator(phoneRegEx)]],
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
      postCode: ['', [Validators.required, customValidator(departmentRegEx)]],
      building: ['', [Validators.required, customValidator(buildingRegEx)]],
      apartment: ['', [customValidator(numberRegEx)]],
    }),
  });

  isChecked(event: boolean) {
    this.isReceiver.set(event);
  }

  chosenPayment(payment: 'CASH' | 'ONLINE') {
    this.checkoutStore.updatePaymentDataReq('paymentType', payment);
  }

  makeOrder() {
    const ownerPhone = this.checkoutForm.controls.owner.get('phone');
    const receiverPhone = this.checkoutForm.controls.receiver.get('phone');
    const city = this.checkoutForm.controls.deliveryType.get('city');
    const street = this.checkoutForm.controls.deliveryType.get('street');
    const postCode = this.checkoutForm.controls.deliveryType.get('postCode');
    const building = this.checkoutForm.controls.deliveryType.get('building');
    const apartment = this.checkoutForm.controls.deliveryType.get('apartment');

    this.checkoutStore.updatePaymentDataReq(
      'customerPhoneNumber',
      receiverPhone?.value || ownerPhone?.value || '',
    );
    this.checkoutStore.updatePaymentDataReq(
      'deliveryAddress',
      `${city?.value} ${street?.value} ${building?.value} ${apartment?.value ? apartment?.value : ''}`,
    );
    this.checkoutStore.updatePaymentDataReq(
      'deliveryPostalCode',
      postCode?.value || '',
    );

    console.log(this.checkoutStore.getPaymentDataReq());

    // this.checkoutService.makeOrder(this.checkoutStore.getPaymentDataReq());
  }
}
