import { CartItemRemoveDto } from '../../cart/models/cart-item-remove-dto.model';
import { CartItemResponse } from '../../cart/models/cart-item-response.model';
import { LocalCartItem } from './local-cart-item.class';
export class LocalCart {
  priceForAll: number = 0;
  items: CartItemResponse[] = [];
  userId = 30040009;
  constructor(price?: number, items?: CartItemResponse[]) {
    if (price) this.priceForAll = price;
    if (items) this.items = items;
  }
  setItem(item: LocalCartItem) {
    this.priceForAll += item.totalCost;
    this.items.push(item);
  }
  removeItem(productInfo: CartItemRemoveDto, price: number) {
    let isDeleted = false;
    this.items = this.items.filter((product) => {
      if (
        productInfo.itemId === product.itemId &&
        price === product.pricePerItem
      ) {
        isDeleted = true;
        this.priceForAll -= product.totalCost;
        return false;
      }
      return true;
    });

    return isDeleted;
  }
}
