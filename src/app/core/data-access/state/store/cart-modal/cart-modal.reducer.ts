import { createReducer, on } from '@ngrx/store';
import { cartModalState } from './cart-modal.actions';

const initialState = { isOpened: false };
export const cartModalReducer = createReducer(
  initialState,
  on(cartModalState, (state, action) => action)
);
