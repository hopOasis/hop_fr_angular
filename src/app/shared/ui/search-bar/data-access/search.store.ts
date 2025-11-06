import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';
import { FilterBy, FilterType } from '../../../interfaces/filter-by.interface';
import { computed, DestroyRef, inject } from '@angular/core';
import { SearchResultService } from './search-result.service';
import { catchError, map, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filtering } from '../utils/filter-by';

type SearchState = {
  productData: ProductDescription[];
  filterBy: FilterType | null;
  filterOptions: FilterBy | null;
  isLoading: boolean;
  hasError: boolean;
  searchWord: string;
};

const initialState: SearchState = {
  productData: [],
  filterBy: null,
  isLoading: false,
  hasError: false,
  filterOptions: null,
  searchWord: '',
};

export const SearchStore = signalStore(
  withState(initialState),

  withComputed(({ productData, filterBy, filterOptions }) => ({
    filtered: computed(() => {
      console.log(`filter by: ${filterBy()}`);
      console.log(`products length: ${productData().length}`);
      switch (filterBy()) {
        case 'inStock':
          console.log(productData());
          return productData().map((data) =>
            data.options.filter((item) => item.quantity > 0)
          );
        case 'price':
          return;

        default:
          return productData();
      }
    }),
  })),

  withMethods(
    (
      store,
      searchResultService = inject(SearchResultService),
      destroyRef = inject(DestroyRef)
    ) => ({
      getData(searchWord: string) {
        patchState(store, {
          productData: [],
          isLoading: true,
          searchWord,
        });

        searchResultService
          .getAllProducts(searchWord)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe({
            next: (products) => {
              let stock = 0;

              products
                .map((data) => data.options.filter((item) => item.quantity > 0))
                .forEach((item) => {
                  if (item.length) stock += 1;
                });

              return patchState(store, {
                productData: products,
                filterOptions: { inStock: stock },
                isLoading: false,
              });
            },
            error: () =>
              patchState(store, { isLoading: false, hasError: true }),
          });
      },

      applyFilter(filterBy: FilterType, filterOptions: FilterBy | null) {
        if (filterOptions !== null) {
          patchState(store, { filterBy, filterOptions });
        } else {
          patchState(store, { filterBy });
        }
      },
    })
  )
);
