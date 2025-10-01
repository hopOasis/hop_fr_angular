import { Component, HostListener, input, output } from '@angular/core';
import { SortingTypes } from '../../data-access/models/sorting-types.model';
/**
 * the main logic of sorting is in navigation component
 */
@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent {
  disabled = input<string>();
  currentSorting = input<SortingTypes>();
  sortBy = output<SortingTypes>();
  isActive = false;

  @HostListener('click', ['$event']) onClick(btn: Event) {
    const reg = /box-button/;

    if (
      (btn.target as HTMLElement).className.match(reg) &&
      this.disabled() !== 'all-products'
    ) {
      this.isActive = !this.isActive;
      this.sortBy.emit(this.changeDirection());
    }
  }

  private changeDirection(): SortingTypes {
    if (this.currentSorting() === 'asc') {
      return 'desc';
    } else {
      return 'asc';
    }
  }
}
