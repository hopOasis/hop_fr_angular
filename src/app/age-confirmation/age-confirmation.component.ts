import { Component } from '@angular/core';

@Component({
  selector: 'app-age-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './age-confirmation.component.html',
  styleUrl: './age-confirmation.component.scss',
})
export class AgeConfirmationComponent {
  is18Confirmed = true;
}
