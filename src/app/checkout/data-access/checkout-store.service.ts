import { Injectable, signal } from '@angular/core';
import {
  DeliveryData,
  DeliveryDataReq,
} from '../interfaces/delivery.interface';
import { defaultDeliveryDataReq } from '../utils/default-data';

Injectable();
export class CheckoutStoreService {
  private deliveryData = signal<DeliveryData | null>(null);
  private paymentDataReq = signal<DeliveryDataReq>(defaultDeliveryDataReq);

  setDeliveryData(deliveryData: DeliveryData) {
    this.deliveryData.set(deliveryData);
  }

  getDeliveryData(): DeliveryData | null {
    return this.deliveryData();
  }

  setPaymentDataReq(data: DeliveryDataReq) {
    this.paymentDataReq.set(data);
  }

  getPaymentDataReq(): DeliveryDataReq {
    return this.paymentDataReq();
  }
}
