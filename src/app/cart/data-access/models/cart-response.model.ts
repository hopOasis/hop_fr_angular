import { CartItemResponse } from "./cart-item-response.model";


export interface CartResponse {
  userId: number;
  items: CartItemResponse[];
  priceForAll: number;
}
