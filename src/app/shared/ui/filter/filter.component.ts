import { Component, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { FilterPriceComponent } from '../filter-price/filter-price.component';
import { FilterRaitingComponent } from '../filter-raiting/filter-raiting.component';
import { FilterVolumeComponent } from '../filter-volume/filter-volume.component';

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
})
export class FilterComponent {
  opened = output<boolean>();
  icon = './svg/filter.svg';
  isOpen = false;
  inStock = 13;

  clicked() {
    this.isOpen = !this.isOpen;
    this.opened.emit(this.isOpen);
  }
}
