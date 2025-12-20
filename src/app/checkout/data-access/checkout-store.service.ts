import { Injectable, signal } from '@angular/core';
import { DeliveryData } from '../interfaces/delivery.interface';

Injectable();
export class CheckoutStoreService {
  private deliveryData = signal<DeliveryData | null>(null);
  private paymentData = signal('');

  setDeliveryData(deliveryData: DeliveryData) {
    this.deliveryData.set(deliveryData);
  }

  getDeliveryData(): DeliveryData | null {
    return this.deliveryData();
  }
}
