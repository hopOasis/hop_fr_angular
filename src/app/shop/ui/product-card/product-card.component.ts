import { input, OnInit, signal } from '@angular/core';
import { Component, computed, inject } from '@angular/core';
import { ProductDescription } from '../../../core/data-access/models/product-description.model';
import { CartItemResponse } from '../../../core/data-access/cart/models/cart-item-response.model';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UpdatePricePipe } from '../../utils/update-price.pipe';
import { UpdateMeasurePipe } from '../../utils/update-measure.pipe';
import { ProductOption } from '../../../core/data-access/models/product-oprion';
import { CartService } from '../../../core/data-access/cart/services/cart.service';
import { CartItemAddDto } from '../../../core/data-access/cart/models/cart-item-add-dto.model';
import { triggerCartApdating } from '../../../core/data-access/state/store/cart/cart.actions';
import { CartItemRemoveDto } from '../../../core/data-access/cart/models/cart-item-remove-dto.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ShopService } from '../../data-access/services/shop.service';
import { ItemTypesEnum } from '../../data-access/models/item-types-enum.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    AsyncPipe,
    UpdatePricePipe,
    UpdateMeasurePipe,
    ToastModule,
    ProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [MessageService],
})
export class ProductCardComponent implements OnInit {
  private messageService = inject(MessageService);
  private cartService = inject(CartService);
  private shopService = inject(ShopService);
  public store = inject<Store<StoreData>>(Store);
  public isAuth$: Observable<{ isAuth: boolean }> = this.store.select('auth');

  public inputData = input.required<ProductDescription>();
  public itemInCart = input.required<CartItemResponse[] | null>();

  public data = signal<null | ProductDescription>(null);

  public isAddedToFavorite = signal(false);
  public quantity = signal(0);
  public currentOption = signal<null | ProductOption>(null);
  public isFetchingProduct = signal(false);
  constructor() {}
  public currentOptionInCart = computed<boolean>(() => {
    if (!this.currentOption()) return false;
    if (!this.itemInCart()) return false;
    return this.itemInCart()!.some(
      (product) => product.pricePerItem === this.currentOption()!.price
    );
  });
  public quontityInCart = computed<number>(() => {
    if (!this.itemInCart() || !this.currentOption()) return 0;
    return (
      this.itemInCart()!.find(
        (product) => this.currentOption()!.price === product.pricePerItem
      )?.quantity || 0
    );
  });

  get productName() {
    return (
      this.data()!.beerName ??
      this.data()!.ciderName ??
      this.data()!.snackName ??
      this.data()!.name!
    );
  }
  get imageUrl() {
    let url =
      this.data()!.imageName ??
      this.data()!.ciderImageName ??
      this.data()!.snackImageName;
    return url ? url[0] : '';
  }
  onChangeOption(option: ProductOption | undefined) {
    this.currentOption.set(option ?? null);
    if (!option) return;
    if (this.isOptionInCart(option.price))
      return this.quantity.set(this.quontityInCart());
    this.quantity.set(1);
  }
  changeAmountOfItems(amount: number) {
    if (
      amount < 0 ||
      (this.currentOption() && amount > this.currentOption()!.quantity)
    ) {
      this.quantity.set(this.currentOption()!.quantity ? 1 : 0);
    } else this.quantity.set(amount);
  }
  isOptionInCart(optionPrice: number | undefined): boolean {
    if (!optionPrice || !this.itemInCart()) return false;
    return this.itemInCart()!.some(
      (product) => product.pricePerItem === optionPrice
    );
  }
  onMoveProduct() {
    this.isFetchingProduct.set(true);
    const cartInfo = this.prepareProductInfo();
    const price = this.currentOption()!.price;
    if (this.isOptionInCart(price)) this.removeProductFromCart(cartInfo, price);
    else
      this.addProductToCart({ quantity: this.quantity(), ...cartInfo }, price);
  }
  prepareProductInfo(): CartItemRemoveDto {
    console.log(this.currentOption());

    return {
      itemId: this.data()!.id,
      itemType: this.data()!.itemType,
      measureValue:
        this.currentOption()?.measureValue ||
        this.currentOption()?.volume ||
        this.currentOption()!.weight!,
    };
  }

  handleError(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Success',
      detail: error,
    });
    this.isFetchingProduct.set(false);
  }
  handleSuccess(state: 'add' | 'rem') {
    let message =
      state === 'add' ? 'Товар додано до корзини!' : 'Товар видалено з корзини';
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
    this.store.dispatch(triggerCartApdating());
    this.isFetchingProduct.set(false);
    this.updateCurrentData();
  }
  addProductToCart(cartInfo: CartItemAddDto, price: number) {
    this.cartService.addProduct(cartInfo, price, this.productName).subscribe({
      next: () => this.handleSuccess('add'),
      error: (error: string) => this.handleError(error),
    });
  }
  removeProductFromCart(cartInfo: CartItemRemoveDto, price: number) {
    this.cartService.removeProduct(cartInfo, price).subscribe({
      next: () => this.handleSuccess('rem'),
      error: (error: string) => this.handleError(error),
    });
  }
  onAddToFavorite() {}

  updateCurrentData() {
    this.shopService
      .getProductItemData(ItemTypesEnum[this.data()!.itemType], this.data()!.id)
      .pipe(take(1))
      .subscribe((data) => this.data.set(data));
  }
  itemQuantityController() {
    this.isAuth$.pipe(take(1)).subscribe((state) => {
      if (state.isAuth) return;
      this.data()!.options.forEach((option) => {
        this.itemInCart()?.forEach((product) => {
          if (
            option.price === product.pricePerItem &&
            option.quantity < product.quantity
          ) {
            this.currentOption.set(option);
            this.cartService
              .removeProduct(this.prepareProductInfo(), option.price)
              .pipe(take(1))
              .subscribe();
          }
        });
      });
    });
  }
  ngOnInit(): void {
    this.data.set(this.inputData());
    let option = this.data()!.options.find((option) => {
      if (option.quantity) return true;
      if (this.itemInCart())
        return this.itemInCart()!.some(
          (product) => product.pricePerItem === option.price
        );
      return false;
    });
    this.onChangeOption(option);
  }
}
