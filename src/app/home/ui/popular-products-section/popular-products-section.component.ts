import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CatalogDataStore } from '../../../catalog/data-access/store/catalog-data.store';
import { ProductCardComponent } from '../../../catalog/ui/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-popular-products-section',
  standalone: true,
  imports: [ProductCardComponent, SpinnerComponent],
  templateUrl: './popular-products-section.component.html',
  styleUrl: './popular-products-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularProductsSectionComponent implements OnInit {
  readonly catalogDataStore = inject(CatalogDataStore);
  public productData = this.catalogDataStore.productData;

  @ViewChild('sliderRef', { static: false })
  private sliderRef!: ElementRef<HTMLDivElement>;
  private scrollStep = 600;

  onPrev(): void {
    if (!this.sliderRef) return;

    this.sliderRef.nativeElement.scrollTo({
      left: this.sliderRef.nativeElement.scrollLeft + this.scrollStep,
      behavior: 'smooth',
    });
  }

  onNext(): void {
    if (!this.sliderRef) return;

    this.sliderRef.nativeElement.scrollTo({
      left: this.sliderRef.nativeElement.scrollLeft - this.scrollStep,
      behavior: 'smooth',
    });
  }

  ngOnInit(): void {
    // this.catalogDataStore.updateData({
    //   sortDirection: 'desc',
    //   productCategory: 'BEER',
    //   page: 1,
    // });
  }
}
