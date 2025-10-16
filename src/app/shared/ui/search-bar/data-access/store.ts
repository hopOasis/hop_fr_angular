import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { SearchResultService } from './search-result.service';
import { SearchResult } from '../../../interfaces/search-result.interface';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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
  // withComputed(({ productData }) => ({})),

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
                }))
              )
            )
          )
        ),
        tap((productData) =>
          patchState(store, { productData, loading: false, error: false })
        ),
        catchError(() => {
          patchState(store, { error: true, loading: false });
          return of([]);
        })
      )
    ),
  }))
);
