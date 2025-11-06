import { Component, inject, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { FilterPriceComponent } from '../filter-price/filter-price.component';
import { FilterRaitingComponent } from '../filter-raiting/filter-raiting.component';
import { FilterVolumeComponent } from '../filter-volume/filter-volume.component';
import { SearchStore } from '../search-bar/data-access/search.store';

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
  providers: [SearchStore],
})
export class FilterComponent {
  public readonly searchStore = inject(SearchStore);

  opened = output<boolean>();
  icon = './svg/filter.svg';
  isOpen = false;
  inStock = input(0);

  clicked() {
    this.isOpen = !this.isOpen;
    this.opened.emit(this.isOpen);
  }

  onChecked(checked: boolean) {
    if (checked) {
      this.searchStore.applyFilter('inStock', null);
      console.log(this.searchStore.filtered());
    }
  }
}
