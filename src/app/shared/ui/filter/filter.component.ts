import { Component, computed, inject, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { FilterPriceComponent } from '../filter-price/filter-price.component';
import { FilterRaitingComponent } from '../filter-raiting/filter-raiting.component';
import { FilterVolumeComponent } from '../filter-volume/filter-volume.component';
import { ResultStore } from '../search-bar/data-access/store';
import { SearchResultSignalService } from '../search-bar/data-access/search-result-signal.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    SlideToggleComponent,
    FilterPriceComponent,
    FilterRaitingComponent,
    FilterVolumeComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [ResultStore],
})
export class FilterComponent {
  private readonly searchResultSignal = inject(SearchResultSignalService);
  opened = output<boolean>();
  icon = './svg/filter.svg';
  isOpen = false;
  inStock = computed(
    () =>
      this.searchResultSignal
        .getSearchResultData()
        .filter((item) => item.quantity > 0).length
  );

  clicked() {
    this.isOpen = !this.isOpen;
    this.opened.emit(this.isOpen);
  }
}
