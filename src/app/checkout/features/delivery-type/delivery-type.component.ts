import { Component, inject } from '@angular/core';

import {
  deliveryTypeItems,
  deliveryTypePrices,
} from '../../utils/delivery-type.config';
import { NovaPoshtaComponent } from '../nova-poshta/nova-poshta.component';
import { DeliveryTypeService } from '../../data-access/delivery-type.service';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [NovaPoshtaComponent],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.scss',
})
export class DeliveryTypeComponent {
  public deliveryTypeItems = deliveryTypeItems;
  public deliveryTypePrices = deliveryTypePrices;
  deliveryService = inject(DeliveryTypeService);

  choosenType(id: number) {
    this.deliveryService.setCurrent(id + 1);
  }
}
