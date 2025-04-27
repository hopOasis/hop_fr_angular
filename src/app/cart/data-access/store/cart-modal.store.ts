import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

const initialState = {
  isOpened: false,
};

export const CartModalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    open: () => patchState(store, { isOpened: true }),
    close: () => patchState(store, { isOpened: false }),
  }))
);
