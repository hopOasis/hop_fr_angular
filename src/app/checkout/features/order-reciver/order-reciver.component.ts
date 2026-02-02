import { Component, computed, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputComponent } from '../../../shared/ui/input/input.component';
import { UserStore } from '../../../user/data-access/store/user.store';
import { CustomValidatorComponent } from '../custom-validator/custom-validator.component';
import { getControl } from '../../utils/get-control';

@Component({
  selector: 'app-order-reciver',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CustomValidatorComponent],
  templateUrl: './order-reciver.component.html',
  styleUrl: './order-reciver.component.scss',
})
export class OrderReciverComponent {
  private userStore = inject(UserStore);
  public userInfo = computed(() => this.userStore.userData());
  public receiver = input.required<FormGroup>();
  public getControl = getControl;
}
