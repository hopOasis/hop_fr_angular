import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { phoneParser } from '../../../utils/phone-parser';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';

@Component({
  selector: 'app-order-reciver',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './order-reciver.component.html',
  styleUrl: './order-reciver.component.scss',
})
export class OrderReciverComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private store = this.checkoutStore.getPaymentDataReq();
  private fb = inject(FormBuilder);

  deliveryForm = input.required<FormGroup>();

  public data = {
    phone: '+380',
    email: '',
    name: '',
    surname: '',
  };

  onInputChange(event: Event) {
    const inputTarget = event.target as HTMLInputElement;
    if (inputTarget.type === 'tel') {
      if (phoneParser(inputTarget.value).length === 16) {
        inputTarget.value = phoneParser(inputTarget.value);
      }
      console.log(inputTarget.value);
      this.store.customerPhoneNumber = inputTarget.value;
    }
  }
}
