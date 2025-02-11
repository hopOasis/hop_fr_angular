export interface CartItem {
  itemId: number;
  quantity: number;
  measureValue: number;
  itemType: string;
}
export interface Cart {
  cartId: number;
  items: CartItem[];
}
