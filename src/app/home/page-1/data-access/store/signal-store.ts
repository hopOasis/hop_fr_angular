import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OfferStoreData } from '../models/offer.interface';
import { ActiveOffersService } from '../services/active-offers.service';

const initialState: OfferStoreData = {
  productData: [],
  step: 4,
  startIndex: 0,
  disabledLeft: true,
  disabledRight: true,
  loading: false,
  error: false,
};

export const OfferStore = signalStore(
  withState(initialState),
  withComputed(({ productData, startIndex, step }) => ({
    currentProduct: computed(() =>
      productData()?.slice(startIndex(), startIndex() + step())
    ),
    weekProductCount: computed(() => productData()?.length || 1),
  })),
  withMethods((store, activeOffersService = inject(ActiveOffersService)) => ({
    loadOffers() {
      patchState(store, { loading: true });
      activeOffersService
        .getActiveOffers('Set of the week')
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: (offers) => {
            patchState(store, {
              productData: offers,
              loading: false,
              disabledRight: !offers?.length,
            });
          },
          error: () => patchState(store, { error: true }),
        });
    },

    clearProductData() {
      patchState(store, { productData: [] });
    },
    updateStepper(step: number) {
      patchState(store, { step });
    },
    startIndexUpdate(startIndex: number) {
      patchState(store, { startIndex });
    },
    disabledRightUpdate(disabledRight: boolean) {
      patchState(store, { disabledRight });
    },
    disabledLeftUpdate(disabledLeft: boolean) {
      patchState(store, { disabledLeft });
    },
  }))
);
