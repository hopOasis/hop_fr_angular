import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const initialState = { isOpened: false };
export const CartModalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateState: (state: boolean) => {
      patchState(store, { isOpened: state });
      if (state) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'scroll';
    },
  }))
);
