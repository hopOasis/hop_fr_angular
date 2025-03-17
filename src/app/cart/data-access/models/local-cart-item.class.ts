import { CartItemAddDto } from './cart-item-add-dto.model';

export class LocalCartItem {
  itemId: number;
  quantity: number;
  totalCost: number;
  pricePerItem: number;
  cartId: number;
  itemTitle: string;
  constructor(cart: CartItemAddDto, itemCost: number, itemTitle: string) {
    this.itemId = cart.itemId;
    this.quantity = cart.quantity;
    this.pricePerItem = itemCost;
    this.totalCost = this.quantity * this.pricePerItem;
    this.cartId = 2025;
    this.itemTitle = itemTitle;
  }
}
