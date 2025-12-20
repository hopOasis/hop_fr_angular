import { Component, inject } from '@angular/core';

import { UserStore } from '../../../user/data-access/store/user.store';
import { progressConfig } from '../../utils/progress.config';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { ProgressService } from '../../data-access/progerss.service';
import { Direction } from '../../interfaces/delivery.interface';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { OrderInfoComponent } from '../order-info/order-info.component';
import { DeliveryTypeService } from '../../data-access/delivery-type.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [DeliveryTypeComponent, PaymentTypeComponent, OrderInfoComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
  providers: [ProgressService, DeliveryTypeService],
})
export class DeliveryComponent {
  private readonly userStore = inject(UserStore);
  public userName = this.userStore.userName;
  public progress = progressConfig;
  progressService = inject(ProgressService);
  deliveryService = inject(DeliveryTypeService);

  continue() {
    this.progressService.udpateCurrentProgress('up');
    this.progressService.previousProgress();
  }

  back() {
    this.deliveryService.setCurrent(0);
    this.progressService.udpateCurrentProgress('down');
    this.progressService.previousProgress();
  }
}
