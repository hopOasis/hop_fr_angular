import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { EndingPipe } from '../../pipes/ending.pipe';

@Component({
  selector: 'app-filter-raiting',
  standalone: true,
  imports: [CheckboxComponent, EndingPipe],
  templateUrl: './filter-raiting.component.html',
  styleUrl: './filter-raiting.component.scss',
})
export class FilterRaitingComponent {
  arrowActive = false;
  ratingFilterActive = false;
  ratingOptions = Array(5).fill('');

  arrowToggle() {
    this.arrowActive = !this.arrowActive;
    this.ratingFilterActive = !this.ratingFilterActive;
  }
}
