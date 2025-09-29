import { CartItemResponse } from './cart-item-response.model';

export interface CartResponse {
  cartId: number;
  userId: number;
  items: CartItemResponse[];
  priceForAll: number;
}
