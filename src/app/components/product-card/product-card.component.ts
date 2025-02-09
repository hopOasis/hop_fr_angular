import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ProductDescription } from '../../models/pageable.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpdateMeasurePipe } from '../../pipes/update-measure.pipe';
import { UpdatePricePipe } from '../../pipes/update-price.pipe';
import { AuthService } from '../../services/auth.service';
import { log } from 'util';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, UpdateMeasurePipe, UpdatePricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  private authService = inject(AuthService)
  public isAuth = this.authService.isAuth
  public data = input.required<ProductDescription>();
  public activeOptionId = signal<number | null>(null);
  public isAddedToFavorite = signal(false);
  public isNotAvailable = signal(false);
  public currentPrice = computed(
    () =>
      this.data().options.find((option) => option.id === this.activeOptionId())
        ?.price
  );

  onChangeOption(optionId: number | null) {
    if (optionId) this.activeOptionId.set(optionId);
  }

  onAddToFavorite(id: number) {
    this.isAddedToFavorite.set(!this.isAddedToFavorite());
  }

  onAddToShop(productId: number, optionId: number | null) {}

  ngOnInit(): void {
    let option = this.data().options.find((option) => option.quantity);
    !option ? this.isNotAvailable.set(true) : false;
    this.activeOptionId.set(option?.id ?? null);
  }
}
