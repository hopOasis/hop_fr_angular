import { Component, inject, input, signal } from '@angular/core';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { SortingComponent } from '../../../shared/ui/sorting/sorting.component';
import { SelectOption } from '../../../shared/interfaces/select-option.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckoutStoreService } from '../../data-access/checkout-store.service';
import { DeliveryData } from '../../interfaces/delivery.interface';

@Component({
  selector: 'app-nova-poshta',
  standalone: true,
  imports: [InputComponent, SortingComponent, ReactiveFormsModule],
  templateUrl: './nova-poshta.component.html',
  styleUrl: './nova-poshta.component.scss',
})
export class NovaPoshtaComponent {
  private fb = inject(FormBuilder);
  private checkoutStore = inject(CheckoutStoreService);
  current = input<string>();
  cities = signal<SelectOption[]>([
    {
      value: 'city',
      text: 'Kyiv',
    },
    {
      value: 'city',
      text: 'Lviv',
    },
    {
      value: 'city',
      text: 'Poltava',
    },
    {
      text: '',
      value: 'deault',
      selected: true,
    },
  ]);

  checkoutForm = this.fb.group({
    userName: [''],
    userSurname: [''],
    deliveryPoint: [''],
    streetNum: [''],
    appartment: [''],
    city: [''],
  });
}
