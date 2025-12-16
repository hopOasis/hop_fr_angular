import { computed, signal } from '@angular/core';

export const progressConfig = [
  'Вид доставки',
  'Тип оплати',
  'Інформація про замовлення',
];

export class Progress {
  private progresses = signal(['delivery-type', 'payment-type', 'order-info']);
  private curentProgress = signal(0);
  public activeProgress = computed(
    () => this.progresses()[this.curentProgress()]
  );

  udpateCurrentProgress(id: number) {
    this.curentProgress.set(id);
  }

  getCurrentProgress(): number {
    return this.curentProgress();
  }
}
