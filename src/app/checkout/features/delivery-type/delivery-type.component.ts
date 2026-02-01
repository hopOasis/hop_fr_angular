import { Component, computed, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import {
  DeliveryDataReq,
  DeliveryMethod,
} from '../../interfaces/delivery.interface';
import { defaultDeliveryDataReq } from '../../utils/default-data';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.scss',
  providers: [],
})
export class DeliveryTypeComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private deliveryType = signal<DeliveryMethod>('POST_OFFICE');

  public deliveryTypeForm = input.required<FormGroup>();
  public isOpened = signal(false);
  public icon = computed(() =>
    this.isOpened() ? 'icon-chevron-down' : 'icon-chevron-up',
  );
  public getDeliveryType = computed(() => this.deliveryType());
  public deliveryTypeTitle = input('');
  public deliveryTypePrice = input('');
  public store!: DeliveryDataReq;

  constructor() {
    this.store = this.checkoutStore.getPaymentDataReq();
  }

  onClick() {
    this.isOpened.update((item) => !item);
  }

  setDeliveryType(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.deliveryType.set(eventTarget.id as DeliveryMethod);
    this.store.deliveryMethod = this.deliveryType();
    this.checkoutStore.setPaymentDataReq(defaultDeliveryDataReq);
  }
}
