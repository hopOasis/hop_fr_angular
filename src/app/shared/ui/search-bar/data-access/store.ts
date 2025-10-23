import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { SearchResultService } from './search-result.service';
import { SearchResult } from '../../../interfaces/search-result.interface';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

interface InitialState {
  productData: SearchResult[];
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  productData: [],
  loading: false,
  error: false,
};

export const ResultStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    inStock: computed((): number => {
      let inStockQuantity = 0;

      store.productData().forEach((item) => {
        if (item?.quantity > 0) {
          inStockQuantity += 1;
        }
      });
      console.log(store.productData());
      return inStockQuantity;
    }),
  })),

  withMethods((store, searchResultService = inject(SearchResultService)) => ({
    loadSearchResult: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((searchWord) =>
          searchResultService.getAllProducts(searchWord).pipe(
            map((products) =>
              products.flatMap((product) =>
                product.options.map((item) => ({
                  id: product.id,
                  imageUrl: product.imageName?.[0],
                  description: product.description,
                  price: item.price,
                  amount: item.measureValue,
                  name: product.name,
                  itemType: product.itemType,
                  averageRating: product.averageRating,
                  quantity: item.quantity,
                }))
              )
            )
          )
        ),
        tapResponse({
          next: (productData) =>
            patchState(store, { productData, loading: false }),
          error: () => patchState(store, { error: true, loading: false }),
        })
      )
    ),
  }))
);
