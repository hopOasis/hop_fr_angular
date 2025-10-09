import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { SearchResultService } from './search-result.service';
import { SearchResult } from '../../../interfaces/search-result.interface';
import { map } from 'rxjs';

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

  withMethods((store, searchResultService = inject(SearchResultService)) => ({
    loadSearchResult(searchWord: string) {
      patchState(store, { loading: true });
      searchResultService
        .getAllProducts(searchWord)
        .pipe(
          map((products) =>
            products.map((product) => {
              const result: SearchResult[] = [];

              product.options.forEach((item) => {
                result.push({
                  id: product.id,
                  imageUrl: product.imageName?.[0],
                  description: product.description,
                  price: item.price,
                  amount: item.measureValue,
                  name: product.name,
                  itemType: product.itemType,
                });
              });

              return result;
            })
          )
        )
        .subscribe({
          next: (result) => {
            patchState(store, {
              productData: result.flatMap((item) => item),
              loading: false,
            });
          },
          error: () => patchState(store, { error: true }),
        });
    },
  }))
);
