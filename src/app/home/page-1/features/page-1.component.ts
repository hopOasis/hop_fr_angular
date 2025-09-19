import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '../../../catalog/ui/product-card/product-card.component';
import { ProductDescription } from '../../../catalog/data-access/models/product-description.model';
import { ActiveOffersService } from '../data-access/services/active-offers.service';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [ProductCardComponent, NgClass],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.scss',
  providers: [ActiveOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page1Component implements OnInit {
  private activeOffersService = inject(ActiveOffersService);
  private platformId = inject(PLATFORM_ID);
  private startIndex = signal(0);
  private step = signal(4);
  private weekProducts: WritableSignal<ProductDescription[]> = signal([]);

  public currentProducts = computed(() =>
    this.weekProducts().slice(
      this.startIndex(),
      this.startIndex() + this.step()
    )
  );
  public weekProductsCount = 0;
  public disabledLeft = true;
  public disabledRight = true;

  @HostListener('window:resize') onResize() {
    this.updateStepper();
  }

  constructor() {
    this.activeOffersService
      .getActiveOffers('Set of the week')
      .pipe(takeUntilDestroyed())
      .subscribe((item) => {
        if (item) {
          this.weekProducts.set(item);
          this.weekProductsCount = this.weekProducts().length;

          if (this.weekProductsCount) this.disabledRight = false;
        }
      });
  }

  ngOnInit(): void {
    this.updateStepper();
  }

  // get visibleProducts(): ProductDescription[] {
  //   return this.weekProducts().slice(
  //     this.startIndex(),
  //     this.startIndex() + this.step()
  //   );
  // }

  updateStepper() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width < 640) this.step.set(1);
      else if (width < 1024) this.step.set(2);
      else if (width < 1440) this.step.set(3);
      else this.step.set(4);
    }
  }

  slideLeft() {
    if (this.startIndex() > 0) {
      this.startIndex.update((id) => (id -= this.step()));

      this.disabledLeft = false;
      this.disabledRight = false;
    }

    if (this.startIndex() < 1) {
      this.disabledLeft = true;
    }
  }

  slideRight() {
    if (this.startIndex() + this.step() < this.weekProductsCount - 1) {
      this.startIndex.update((id) => (id += this.step()));

      this.disabledRight = false;
      this.disabledLeft = false;
    }

    if (this.weekProductsCount - 1 <= this.startIndex() + this.step()) {
      this.disabledRight = true;
    }
  }
}
