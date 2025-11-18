export interface CartItemResponse {
  cartId: number;
  itemId: number;
  itemTitle: string;
  pricePerItem: number;
  quantity: number;
  totalCost: number;
}
