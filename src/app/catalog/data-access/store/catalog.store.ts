import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CatalogStoreData, NotRequiredData } from '../models/store-data.model';
import { inject } from '@angular/core';
import { CatalogDataStore } from './catalog-data.store';
const initialState: CatalogStoreData = {
  page: 0,
  productCategory: 'all-products',
  sortDirection: undefined,
};
export const CatalogStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, catalogDataStore = inject(CatalogDataStore)) => ({
    updateInfo(data: NotRequiredData) {
      patchState(store, {
        ...data,
      });
      catalogDataStore.updateData({
        page: store.page(),
        sortDirection: store.sortDirection(),
        productCategory: store.productCategory(),
      });
    },
  }))
);
