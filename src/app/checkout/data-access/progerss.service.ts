import { computed, Injectable, signal } from '@angular/core';

import { deliveryItems, deliveryTypes } from '../utils/delivery-type.config';
import { Direction } from '../interfaces/delivery.interface';

@Injectable()
export class ProgressService {
  private progresses = signal(['delivery-type', 'payment-type', 'order-info']);
  private curentProgress = signal(0);

  public activeProgress = computed(
    () => this.progresses()[this.curentProgress()]
  );

  previousProgress() {
    console.log(this.progresses().indexOf(this.activeProgress()));
  }

  udpateCurrentProgress(direction: Direction) {
    if (direction === 'up') {
      this.curentProgress.update((val) =>
        val < this.progresses().length - 1 ? val + 1 : val
      );
    }
    if (direction === 'down') {
      this.curentProgress.update((val) => (val > 0 ? val - 1 : val));
    }
  }

  getCurrentProgress(): number {
    return this.curentProgress();
  }

  getProgresses(): string[] {
    return this.progresses();
  }
}
