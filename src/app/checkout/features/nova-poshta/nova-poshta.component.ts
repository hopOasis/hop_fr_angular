import { Component, inject, input } from '@angular/core';
import { CustomValidatorComponent } from '../custom-validator/custom-validator.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  buildingRegEx,
  customValidator,
  departmentRegEx,
  emailRegEx,
  nameRegEx,
  numberRegEx,
  phoneRegEx,
} from '../../utils/validator';
import { getControl } from '../../utils/get-control';
import { DeliveryMethod } from '../../interfaces/delivery.interface';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { FormService } from '../../data-access/form.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nova-poshta',
  standalone: true,
  imports: [ReactiveFormsModule, CustomValidatorComponent, InputComponent],
  templateUrl: './nova-poshta.component.html',
  styleUrl: './nova-poshta.component.scss',
})
export class NovaPoshtaComponent {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);

  public novaPoshtaForm = this.fb.group({
    city: ['', [Validators.required, customValidator(nameRegEx)]],
    street: ['', [Validators.required, customValidator(nameRegEx)]],
    postCode: ['', [Validators.required, customValidator(departmentRegEx)]],
    building: ['', [Validators.required, customValidator(buildingRegEx)]],
    apartment: ['', [customValidator(numberRegEx)]],
  });

  public getControl = getControl;
  public getDeliveryType = input.required<DeliveryMethod>();

  constructor() {
    this.novaPoshtaForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.formService.setFrom(this.novaPoshtaForm));
  }
}
