import { Component, computed, inject, input, signal } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import {
  DeliveryDataReq,
  DeliveryMethod,
} from '../../interfaces/delivery.interface';
import { defaultDeliveryDataReq } from '../../utils/default-data';
import { getControl } from '../../utils/get-control';
import { NovaPoshtaComponent } from '../nova-poshta/nova-poshta.component';
import { UkrPoshtaComponent } from '../ukr-poshta/ukr-poshta.component';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [
    NovaPoshtaComponent,
    UkrPoshtaComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.scss',
  providers: [],
})
export class DeliveryTypeComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private deliveryType = signal<DeliveryMethod>('POST_OFFICE');

  public isOpened = signal(false);
  public icon = computed(() =>
    this.isOpened() ? 'icon-chevron-down' : 'icon-chevron-up',
  );
  public getDeliveryType = computed(() => this.deliveryType());
  public deliveryTypeTitle = input('');
  public deliveryTypePrice = input('');

  getControl = getControl;

  onClick() {
    this.isOpened.update((item) => !item);
  }

  setDeliveryType(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.deliveryType.set(eventTarget.id as DeliveryMethod);
    this.checkoutStore.setPaymentDataReq(defaultDeliveryDataReq);
    this.checkoutStore.updatePaymentDataReq(
      'deliveryMethod',
      this.deliveryType(),
    );
  }
}
