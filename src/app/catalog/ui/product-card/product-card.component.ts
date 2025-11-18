import {
  ChangeDetectionStrategy,
  computed,
  input,
  OnInit,
} from '@angular/core';
import { Component, inject } from '@angular/core';
import { UpdatePricePipe } from '../../utils/update-price.pipe';
import { UpdateMeasurePipe } from '../../utils/update-measure.pipe';
import { ProductOption } from '../../data-access/models/product-oprion';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router, RouterLink } from '@angular/router';
import { ProductDescription } from '../../data-access/models/product-description.model';
import { ProductStore } from '../../data-access/store/product.store';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';

import { BigBasketButtonComponent } from '../big-basket-button/big-basket-button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    UpdatePricePipe,
    UpdateMeasurePipe,
    ToastModule,
    ProgressSpinnerModule,
    RouterLink,
    BigBasketButtonComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [MessageService, ProductStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  private messageService = inject(MessageService);
  readonly productStore = inject(ProductStore);
  private readonly route = inject(Router);
  authApiService = inject(AuthApiService);

  productName = this.productStore.productName;
  imageUrl = this.productStore.imageUrl;
  quantity = this.productStore.quantity;
  currentOption = this.productStore.currentOption;
  isFetchingProduct = this.productStore.isProcessing;
  isAddedToFavorite = this.productStore.isAdedToFavorite;
  data = this.productStore.productData;
  currentOptionInCart = this.productStore.currentOptionInCart;
  quontityInCart = this.productStore.quontityInCart;

  public inputData = input.required<ProductDescription>();
  public currentPrice = computed(() =>
    this.quantity()
      ? this.currentOption()!.price * this.quantity()
      : this.currentOption()!.price
  );
  onChangeOption(option: ProductOption | undefined) {
    this.productStore.updateCurrentOption(option);
  }
  changeAmountOfItems(amount: number) {
    this.productStore.changeAmountOfItems(amount);
  }
  onMoveProduct() {
    if (this.authApiService.isAuth()) {
      this.productStore.toggleCartItem().subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              data === 'rem'
                ? 'Товар видалено з корзини'
                : 'Товар додано до корзини!',
          });
        },
        error: (error: string) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Success',
            detail: error,
          }),
      });
    } else {
      this.authApiService.updateModalState(true);
    }
  }

  onAddToFavorite() {}
  ngOnInit(): void {
    this.productStore.addData(this.inputData());
    let option = this.productStore.defineCurrentOption();
    this.onChangeOption(option);
  }
}
