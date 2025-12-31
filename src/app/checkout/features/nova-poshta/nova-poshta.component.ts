import { Component, inject, input, OnInit, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { SortingComponent } from '../../../shared/ui/sorting/sorting.component';
import { SelectOption } from '../../../shared/interfaces/select-option.interface';
import { FormsModule } from '@angular/forms';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { DeliveryData } from '../../interfaces/delivery.interface';
import { UserStore } from '../../../user/data-access/store/user.store';

@Component({
  selector: 'app-nova-poshta',
  standalone: true,
  imports: [InputComponent, SortingComponent, FormsModule],
  templateUrl: './nova-poshta.component.html',
  styleUrl: './nova-poshta.component.scss',
  providers: [],
})
export class NovaPoshtaComponent implements OnInit {
  private checkoutStore = inject(CheckoutStoreService);
  private userStore = inject(UserStore);

  current = input<string>();
  cities = signal<SelectOption[]>([
    {
      value: 'Kyiv',
      text: 'Kyiv',
    },
    {
      value: 'Lviv',
      text: 'Lviv',
    },
    {
      value: 'Poltava',
      text: 'Poltava',
    },
    {
      text: '',
      value: 'deault',
      selected: true,
    },
  ]);
  data: DeliveryData = {
    firstName: '',
    lastName: '',
    city: '',
    deliveryPoint: '',
    appartment: '',
    streetNum: '',
    phone: '',
    email: '',
  };

  ngOnInit(): void {
    const user = this.userStore.userInfo();
    if (user) {
      this.data.firstName = user.firstName;
      this.data.lastName = user.lastName;
      this.data.email = user.email;
    }
  }

  dataChange() {
    this.checkoutStore.setDeliveryData(this.data);
  }

  deliveryPointSelected(point: string) {
    this.data.deliveryPoint = point;
  }

  citySelected(city: string) {
    this.data.city = city;
  }
}
