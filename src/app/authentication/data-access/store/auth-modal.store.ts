import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const initialState = { isOpened: false };

export const AuthModalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateState: (state: boolean) => patchState(store, { isOpened: state }),
  }))
);
