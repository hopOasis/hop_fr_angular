import { computed, Injectable, signal } from '@angular/core';
import {
  deliveryItems,
  deliveryTypeItems,
  deliveryTypes,
} from '../utils/delivery-type.config';

Injectable();
export class DeliveryTypeService {
  private deliveryTypes = signal(deliveryItems);
  private previousDeliveryItem = signal('');
  private currentDeliveryItem = signal<string>('default');
  private currentDeliveryID = signal(0);
  private deliveryItems = signal(deliveryTypes);
  private deliveryTitles = signal([
    'Оберіть спосіб доставки',
    ...deliveryTypeItems,
  ]);

  getCurrentTitle = computed(
    () => this.deliveryTitles()[this.currentDeliveryID()]
  );

  nextDeliveryID() {
    this.currentDeliveryID.update((id) =>
      id <= this.deliveryItems().length ? id + 1 : id
    );
  }

  prevDeliveryID() {
    this.currentDeliveryID.update((id) => (id > 0 ? id - 1 : id));
  }

  setCurrent(id: number) {
    this.currentDeliveryID.set(id);
  }

  getCurrent = computed(() => this.deliveryItems()[this.currentDeliveryID()]);

  getDeliveryTypes() {
    return this.deliveryTypes();
  }

  changeCurrentDeliveryItem(item: string) {
    this.previousDeliveryItem.set(this.currentDeliveryItem());
    this.currentDeliveryItem.set(item);
  }

  stepBack() {}

  getCurrentDeliveryItem(): string | null {
    return this.currentDeliveryItem();
  }

  getPreviousDeliveryItem(): string {
    return this.previousDeliveryItem();
  }
}
