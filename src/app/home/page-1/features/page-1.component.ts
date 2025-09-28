import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';

import { ProductCardComponent } from '../../../catalog/ui/product-card/product-card.component';
import { ActiveOffersService } from '../data-access/services/active-offers.service';
import { OfferStore } from '../data-access/store/signal-store';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [ProductCardComponent, NgClass, SpinnerComponent],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.scss',
  providers: [ActiveOffersService, OfferStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page1Component implements OnInit {
  public readonly store = inject(OfferStore);

  private platformId = inject(PLATFORM_ID);

  @HostListener('window:resize') onResize() {
    this.updateStepper();
  }

  constructor() {
    this.store.loadOffers();
  }

  ngOnInit(): void {
    this.updateStepper();
  }

  updateStepper() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width < 640) this.store.updateStepper(1);
      else if (width < 1024) this.store.updateStepper(2);
      else if (width < 1440) this.store.updateStepper(3);
      else this.store.updateStepper(4);
    }
  }

  slideLeft() {
    if (this.store.startIndex() > 0) {
      this.store.startIndexUpdate(this.store.startIndex() - this.store.step());
      this.store.disabledLeftUpdate(false);
      this.store.disabledRightUpdate(false);
    }

    if (this.store.startIndex() < 1) {
      this.store.disabledLeftUpdate(true);
    }
  }

  slideRight() {
    if (
      this.store.startIndex() + this.store.step() <
      this.store.weekProductCount() - 1
    ) {
      this.store.startIndexUpdate(this.store.startIndex() + this.store.step());

      this.store.disabledRightUpdate(false);
      this.store.disabledLeftUpdate(false);
    }

    if (
      this.store.startIndex() + this.store.step() >=
      this.store.weekProductCount() - 1
    ) {
      this.store.disabledRightUpdate(true);
    }
  }
}
