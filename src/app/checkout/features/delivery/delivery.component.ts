import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { OrderReciverComponent } from '../order-reciver/order-reciver.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { CheckoutService } from '../../data-access/checkout.service';
import {
  customValidator,
  emailRegEx,
  nameRegEx,
  phoneRegEx,
} from '../../utils/validator';
import { FormService } from '../../data-access/form.service';

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
  providers: [CheckoutStoreService, CheckoutService, FormService],
})
export class DeliveryComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private checkoutService = inject(CheckoutService);
  private formService = inject(FormService);
  private fb = inject(FormBuilder);

  public paymentType = computed(
    () => this.checkoutStore.getPaymentDataReq().paymentType,
  );
  public isReceiver = signal(false);
  public isPaymentDataReqValid = signal(
    () =>
      ((this.checkoutForm.controls.owner.get('phone')?.valid ||
        this.checkoutForm.controls.receiver.get('phone')?.valid) &&
        this.formService.getForm()?.get('postCode')?.valid &&
        this.formService.getForm()?.get('city')?.valid) ||
      (this.formService.getForm()?.get('city')?.valid &&
        this.formService.getForm()?.get('building')?.valid &&
        this.formService.getForm()?.get('street')?.valid),
  );
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
  });

  isChecked(event: boolean) {
    this.isReceiver.set(event);
  }

  chosenPayment(payment: 'CASH' | 'ONLINE') {
    this.checkoutStore.updatePaymentDataReq('paymentType', payment);
  }

  makeOrder() {
    let customerPhoneNumber = '';
    let street = this.formService.getForm()?.value.street;
    let city = this.formService.getForm()?.value.city;
    let deliveryPostalCode = this.formService.getForm()?.value.postCode;
    let apartment = this.formService.getForm()?.value.apartment;
    let building = this.formService.getForm()?.value.building;

    this.checkoutStore.updatePaymentDataReq(
      'deliveryAddress',
      `${city} ${street} ${building} ${apartment}`,
    );

    if (this.isReceiver()) {
      customerPhoneNumber =
        this.checkoutForm.controls.receiver.value?.phone || '';
    } else {
      customerPhoneNumber = this.checkoutForm.controls.owner.value?.phone || '';
    }
    this.checkoutStore.updatePaymentDataReq(
      'customerPhoneNumber',
      customerPhoneNumber,
    );
    if (deliveryPostalCode) {
      this.checkoutStore.updatePaymentDataReq(
        'deliveryPostalCode',
        deliveryPostalCode,
      );
    }
    if (this.isPaymentDataReqValid()()) {
      this.checkoutService.makeOrder(this.checkoutStore.getPaymentDataReq());
    }
  }
}
