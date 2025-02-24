import { input, OnInit, signal } from '@angular/core';
import { Component } from '@angular/core';
import { ProductDescription } from '../../models/pageable.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpdateMeasurePipe } from '../../pipes/update-measure.pipe';
import { UpdatePricePipe } from '../../pipes/update-price.pipe';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StoreData } from '../../models/store.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, UpdateMeasurePipe, UpdatePricePipe, AsyncPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  public data = input.required<ProductDescription>();
  public activeOptionId = signal<number | null>(null);
  public isAddedToFavorite = signal(false);
  public isNotAvailable = signal(false);
  public isAuth$: Observable<boolean>;
  public currentPrice = signal<number | undefined>(undefined);
  constructor(private store: Store<StoreData>) {
    this.isAuth$ = store.select('auth');
  }
  onChangeOption(optionId: number) {
    this.activeOptionId.set(optionId);
    this.currentPrice.set(
      this.data().options.find((option) => option.id === this.activeOptionId())
        ?.price
    );
  }
  onAddToFavorite(id: number) {
    this.isAddedToFavorite.set(!this.isAddedToFavorite());
  }
  onAddToShop(productId: number, optionId: number | null) {}
  ngOnInit(): void {
    let option = this.data().options.find((option) => option.quantity);
    if (option) {
      this.isNotAvailable.set(!option);
      this.activeOptionId.set(option.id);
    }

    this.currentPrice.set(
      this.data().options.find((option) => option.id === this.activeOptionId())
        ?.price
    );
  }
}
