import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { getControl } from '../../utils/get-control';
import {
  buildingRegEx,
  customValidator,
  nameRegEx,
  numberRegEx,
} from '../../utils/validator';
import { CustomValidatorComponent } from '../custom-validator/custom-validator.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { FormService } from '../../data-access/form.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ukr-poshta',
  standalone: true,
  imports: [ReactiveFormsModule, CustomValidatorComponent, InputComponent],
  templateUrl: './ukr-poshta.component.html',
  styleUrl: './ukr-poshta.component.scss',
})
export class UkrPoshtaComponent {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);

  public ukrPoshtaForm = this.fb.group({
    city: ['', [Validators.required, customValidator(nameRegEx)]],
    street: ['', [Validators.required, customValidator(nameRegEx)]],
    building: ['', [Validators.required, customValidator(buildingRegEx)]],
    apartment: ['', [customValidator(numberRegEx)]],
  });

  public getControl = getControl;

  constructor() {
    this.ukrPoshtaForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.formService.setFrom(this.ukrPoshtaForm));
  }
}
