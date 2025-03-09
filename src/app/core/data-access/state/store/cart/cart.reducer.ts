import { createReducer, on } from '@ngrx/store';

import { triggerCartApdating, updateCart } from './cart.actions';
import { CartResponse } from '../../../cart/models/cart-response.model';

const initialState: { cartDetails: CartResponse | null } = {
  cartDetails: null,
};
export const cartReducer = createReducer(
  initialState,
  on(updateCart, (state, action) => {
    return { cartDetails: action.cartDetails };
  }),
  on(triggerCartApdating, (state) => state)
);
