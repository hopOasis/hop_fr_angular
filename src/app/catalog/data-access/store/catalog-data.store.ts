import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FetchedProductData } from '../models/product-api-response.model';
import { computed, inject } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { CatalogStoreData } from '../models/store-data.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
const initialState: {
  productData: null | FetchedProductData;
  loading: boolean;
} = {
  productData: null,
  loading: false,
};
export const CatalogDataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    availablePages: computed(() =>
      store.productData() ? store.productData()!.totalPages : 0
    ),
  })),
  withMethods((store, shopService = inject(ShopService)) => ({
    updateData: rxMethod<CatalogStoreData>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((data) => shopService.getProductList(data)),
        tapResponse({
          next: (data) =>
            patchState(store, { productData: data, loading: false }),
          error: () => patchState(store, { loading: false }),
        })
      )
    ),
  }))
);
