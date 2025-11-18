import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchStore } from '../search-bar/data-access/search.store';

@Component({
  selector: 'app-filter-price',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss',
  providers: [SearchStore],
})
export class FilterPriceComponent {
  private searchStore = inject(SearchStore);

  arrowActive = false;
  priceFilterActive = false;
  minPrice = signal(0);
  maxPrice = signal(1000);
  fromRange = 0;
  toRange = 1000;
  step = 10;
  min = 0;
  max = 1000;

  @ViewChild('minInputRange', { read: ElementRef }) minInputRange!: ElementRef;
  @ViewChild('maxInputRange', { read: ElementRef }) maxInputRange!: ElementRef;

  arrowToggle() {
    this.arrowActive = !this.arrowActive;
    this.priceFilterActive = !this.priceFilterActive;
  }

  onMaxChange(value: string | number) {
    let maxValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (this.fromRange < maxValue) {
      this.toRange = maxValue;
      this.maxPrice.set(this.toRange);

      this.searchStore.applyFilter('price', {
        minValue: this.minPrice(),
        maxValue: this.maxPrice(),
      });
    } else {
      this.toRange = this.fromRange + this.step;
      this.maxInputRange.nativeElement.value = this.toRange.toString();
      this.maxPrice.set(this.toRange);

      this.searchStore.applyFilter('price', {
        minValue: this.minPrice(),
        maxValue: this.maxPrice(),
      });
    }

    this.searchStore.filtered();
  }

  onMinChange(value: string | number) {
    let minValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (this.toRange > minValue) {
      this.fromRange = minValue;
      this.minPrice.set(this.fromRange);

      this.searchStore.applyFilter('price', {
        minValue: this.minPrice(),
        maxValue: this.maxPrice(),
      });
    } else {
      this.fromRange = this.toRange - this.step;
      this.minInputRange.nativeElement.value = this.fromRange.toString();
      this.minPrice.set(this.fromRange);

      this.searchStore.applyFilter('price', {
        minValue: this.minPrice(),
        maxValue: this.maxPrice(),
      });
    }
    this.searchStore.filtered();
  }
}
