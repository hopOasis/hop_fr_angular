import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { getControl } from '../../utils/get-control';

@Component({
  selector: 'app-custom-validator',
  standalone: true,
  imports: [],
  templateUrl: './custom-validator.component.html',
  styleUrl: './custom-validator.component.scss',
})
export class CustomValidatorComponent {
  public control = input.required<AbstractControl | null>();
  public message = input('');
}
