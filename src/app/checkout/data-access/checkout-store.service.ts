import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  DeliveryData,
  DeliveryDataReq,
} from '../interfaces/delivery.interface';
import { defaultDeliveryDataReq } from '../utils/default-data';

Injectable();
export class CheckoutStoreService {
  private deliveryData = signal<DeliveryData | null>(null);
  private paymentDataReq: WritableSignal<DeliveryDataReq> =
    signal<DeliveryDataReq>(defaultDeliveryDataReq);

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

  updatePaymentDataReq<K extends keyof DeliveryDataReq>(
    key: K,
    value: DeliveryDataReq[K],
  ) {
    this.paymentDataReq.update((data) => ({
      ...data,
      [key]: value,
    }));
  }

  isPaymentDataReqValid(): boolean {
    const {
      paymentType,
      customerPhoneNumber,
      deliveryPostalCode,
      deliveryMethod,
    } = this.getPaymentDataReq();

    if (
      paymentType.length === 0 ||
      customerPhoneNumber.length === 0 ||
      deliveryMethod.length === 0 ||
      deliveryPostalCode.length === 0
    ) {
      return false;
    }

    return true;
  }
}
