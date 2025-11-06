import { Component, inject } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { EndingPipe } from '../../pipes/ending.pipe';
import { SearchResultSignalService } from '../search-bar/data-access/search-result-signal.service';

@Component({
  selector: 'app-filter-raiting',
  standalone: true,
  imports: [CheckboxComponent, EndingPipe],
  templateUrl: './filter-raiting.component.html',
  styleUrl: './filter-raiting.component.scss',
})
export class FilterRaitingComponent {
  private readonly searchResultSignal = inject(SearchResultSignalService);

  arrowActive = false;
  ratingFilterActive = false;
  ratingOptions = Array(5).fill('');

  arrowToggle() {
    this.arrowActive = !this.arrowActive;
    this.ratingFilterActive = !this.ratingFilterActive;
  }

  isChecked(checked: boolean, index: number) {
    console.log(checked, index + 1);
    if (checked) {
      console.log(this.searchResultSignal.filtered('rating'));
    }
  }
}
