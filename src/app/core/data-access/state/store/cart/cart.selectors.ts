import { CartResponse } from '../../../cart/models/cart-response.model';

interface State {
  cart: { cartDetails: CartResponse | null };
}
export const selectCartAmount = (state: State) => {
  if (state.cart.cartDetails)
    return (state.cart.cartDetails as CartResponse).items.length;
  return 0;
};
export const selectCartItems = (state: State) => {
  if (state.cart.cartDetails)
    return (state.cart.cartDetails as CartResponse).items;
  return [];
};
export const selectCartId = (state: State) => {
  if (state.cart.cartDetails)
    return (state.cart.cartDetails as CartResponse).items[0]?.cartId;
  return null;
};
export const selectCartCosts = (state: State) => {
  if (state.cart.cartDetails?.priceForAll)
    return (state.cart.cartDetails as CartResponse).priceForAll;
  return 0;
};
