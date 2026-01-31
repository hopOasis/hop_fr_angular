import { Component, computed, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { UserStore } from '../../../user/data-access/store/user.store';

@Component({
  selector: 'app-order-reciver',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './order-reciver.component.html',
  styleUrl: './order-reciver.component.scss',
})
export class OrderReciverComponent {
  private userStore = inject(UserStore);
  public userInfo = computed(() => this.userStore.userData());
  public receiver = input.required<FormGroup>();

  getControl(contr: string): AbstractControl | null {
    return this.receiver().get(contr);
  }
}
