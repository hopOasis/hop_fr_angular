import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { UserStore } from '../../../user/data-access/store/user.store';
import { customValidator } from '../../utils/validator';

@Component({
  selector: 'app-order-reciver',
  standalone: true,
  imports: [InputComponent, FormsModule],
  templateUrl: './order-reciver.component.html',
  styleUrl: './order-reciver.component.scss',
})
export class OrderReciverComponent {
  private userStore = inject(UserStore);
  public userInfo = computed(() => this.userStore.userData());
  public valid = customValidator();

  onChange(
    event: Event,
    regEx: RegExp,
    contr: 'name' | 'surname' | 'phone' | 'email',
  ) {
    this.valid.onChange(event, regEx, contr);
  }
}
