import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-price',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss',
})
export class FilterPriceComponent {
  arrowActive = false;
  priceFilterActive = false;
  minPrice = 0;
  maxPrice = 1000;
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
    console.log(`max ${value}`);
    if (this.fromRange < maxValue) {
      this.toRange = maxValue;
      this.maxPrice = this.toRange;
    } else {
      this.toRange = this.fromRange + this.step;
      this.maxInputRange.nativeElement.value = this.toRange.toString();
      this.maxPrice = this.toRange;
    }
  }

  onMinChange(value: string | number) {
    let minValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (this.toRange > minValue) {
      this.fromRange = minValue;
      this.minPrice = this.fromRange;
    } else {
      this.fromRange = this.toRange - this.step;
      this.minInputRange.nativeElement.value = this.fromRange.toString();
      this.minPrice = this.fromRange;
    }
  }
}
