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
import { RouterLink } from '@angular/router';
import { ProductDescription } from '../../data-access/models/product-description.model';
import { ProductStore } from '../../data-access/store/product.store';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';

import { BigBasketButtonComponent } from '../big-basket-button/big-basket-button.component';
import { AuthStore } from '../../../authentication/data-access/store/auth.store';

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
  authApiService = inject(AuthApiService);
  private readonly authStore = inject(AuthStore);
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

  onAddToCart() {
    this.productStore.addProductToCart({
      ...this.productStore.infoRemoveDto(),
      quantity: this.quantity(),
    });
  }

  onRemoveFromCart() {
    console.log(this.productStore.infoRemoveDto());
    this.productStore.removeProductFromCart({
      ...this.productStore.infoRemoveDto(),
    });
  }

  onToggleProductIntoCart() {
    if (!this.authStore.isAuth()) {
      this.authApiService.updateModalState(true);
      return;
    }

    this.currentOptionInCart() ? this.onRemoveFromCart() : this.onAddToCart();
  }

  onAddToFavorite() {
    console.log('first');
    console.log(this.quantity(), this.quontityInCart());
  }
  ngOnInit(): void {
    this.productStore.addData(this.inputData());
    let option = this.productStore.defineCurrentOption();
    this.onChangeOption(option);
  }
}
