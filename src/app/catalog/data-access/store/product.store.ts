import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProductDescription } from '../models/product-description.model';
import { computed, inject } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { ProductOption } from '../models/product-oprion';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';
import { CartItemAddDto } from '../../../cart/data-access/models/cart-item-add-dto.model';
import { CartItemRemoveDto } from '../../../cart/data-access/models/cart-item-remove-dto.model';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { ItemTypesEnum } from '../models/item-types-enum.model';
interface ProductStoreData {
  productData: ProductDescription | null;
  loading: boolean;
  error: boolean;
  quantity: number;
  isAdedToFavorite: boolean;
  currentOption: ProductOption | null;
  isProcessing: boolean;
}
const initialState: ProductStoreData = {
  productData: null,
  loading: false,
  error: false,
  quantity: 0,
  isAdedToFavorite: false,
  currentOption: null,
  isProcessing: false,
};
export const ProductStore = signalStore(
  withState<ProductStoreData>(initialState),
  withComputed((store, cartApi = inject(CartApiService)) => ({
    priceOfFirstOption: computed(() => {
      return store.productData()?.options[0].price || 0;
    }),
    currentOptionInCart: computed<boolean>(() => {
      if (!store.currentOption() || !cartApi.cartItems().length) return false;
      return cartApi
        .cartItems()
        .some(
          (product) =>
            product.pricePerItem === store.currentOption()!.price &&
            product.itemId === store.productData()?.id
        );
    }),
    quontityInCart: computed<number>(() => {
      if (!cartApi.cartItems().length || !store.currentOption()) return 0;
      return (
        cartApi
          .cartItems()
          .find(
            (product) =>
              store.currentOption()!.price === product.pricePerItem &&
              product.itemId === store.productData()?.id
          )?.quantity || 0
      );
    }),
    productName: computed<string>(
      () =>
        store.productData()?.beerName ??
        store.productData()?.ciderName ??
        store.productData()?.snackName ??
        store.productData()?.name!
    ),
    imageUrl: computed<string>(() => {
      let url =
        store.productData()?.imageName ??
        store.productData()?.ciderImageName ??
        store.productData()?.snackImageName;
      return url ? url[0] : '';
    }),
    infoRemoveDto: computed(() => {
      return {
        itemId: store.productData()!.id,
        itemType: store.productData()!.itemType,
        measureValue:
          store.currentOption()?.measureValue ||
          store.currentOption()?.volume ||
          store.currentOption()?.weight ||
          0,
      };
    }),
    measureValue: computed(
      () =>
        store.currentOption()?.measureValue ||
        store.currentOption()?.volume ||
        store.currentOption()?.weight ||
        0
    ),
  })),
  withMethods(
    (
      store,
      shopService = inject(ShopService),
      cartApi = inject(CartApiService),
      authApi = inject(AuthApiService)
    ) => ({
      defineCurrentOption(): ProductOption | undefined {
        this.itemQuantityController();
        return store
          .productData()!
          .options.find((option) =>
            option.quantity
              ? true
              : cartApi
                  .cartItems()
                  .some((product) => product.pricePerItem === option.price)
          );
      },
      changeAmountOfItems(amount: number) {
        if (
          amount < 0 ||
          (store.currentOption() && amount > store.currentOption()!.quantity)
        ) {
          patchState(store, {
            quantity: store.currentOption()!.quantity ? 1 : 0,
          });
        } else patchState(store, { quantity: amount });
      },
      updateCurrentOption(option: ProductOption | undefined) {
        patchState(store, { currentOption: option ? option : null });
        if (!option) return;
        patchState(store, {
          quantity: store.currentOptionInCart() ? store.quontityInCart() : 1,
        });
      },
      addData(data: ProductDescription) {
        patchState(store, { productData: data });
      },
      fetchData(productId: number, productType: string): void {
        patchState(store, { loading: true, isProcessing: true });
        shopService
          .getProductItemData(productType, productId)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              patchState(store, {
                productData: data,
                loading: false,
                isProcessing: false,
                error: false,
              });
              let option = this.defineCurrentOption();
              this.updateCurrentOption(option);
            },
            error: () =>
              patchState(store, {
                error: true,
                loading: false,
                isProcessing: false,
              }),
          });
      },
      toggleCartItem(): Observable<string | CartItemResponse> {
        patchState(store, { isProcessing: true });
        const cartInfo = store.infoRemoveDto();
        const price = store.currentOption()!.price;
        if (store.currentOptionInCart())
          return this.removeProductFromCart(cartInfo, price);
        else
          return this.addProductToCart(
            { quantity: store.quantity(), ...cartInfo },
            price
          );
      },
      removeProductFromCart(
        cartInfo: CartItemRemoveDto,
        price: number
      ): Observable<string> {
        return cartApi.removeProduct(cartInfo, price, authApi.isAuth()).pipe(
          tap({
            next: () => {
              cartApi.triggerCartUpdate(authApi.isAuth());
              patchState(store, { isProcessing: false });
              this.fetchData(
                store.productData()!.id,
                ItemTypesEnum[store.productData()!.itemType]
              );
            },
            error: () => patchState(store, { isProcessing: false }),
          }),
          switchMap(() => of('rem'))
        );
      },
      addProductToCart(
        cartInfo: CartItemAddDto,
        price: number
      ): Observable<CartItemResponse> {
        return cartApi
          .addProduct(cartInfo, price, store.productName(), authApi.isAuth())
          .pipe(
            tap({
              next: () => {
                cartApi.triggerCartUpdate(authApi.isAuth());
                patchState(store, { isProcessing: false });
              },
              error: () => patchState(store, { isProcessing: false }),
            })
          );
      },
      itemQuantityController() {
        if (authApi.isAuth()) return;
        store.productData()?.options.forEach((option) => {
          cartApi.cartItems().forEach((product) => {
            if (
              option.price === product.pricePerItem &&
              option.quantity < product.quantity
            ) {
              patchState(store, { currentOption: option });
              this.removeProductFromCart(
                store.infoRemoveDto(),
                store.currentOption()!.price
              )
                .pipe(take(1))
                .subscribe();
            }
          });
        });
      },
    })
  )
);
