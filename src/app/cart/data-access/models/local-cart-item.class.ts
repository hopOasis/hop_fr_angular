import { ProductType } from '../../../catalog/data-access/models/product-types.model';
import { CartItemAddDto } from './cart-item-add-dto.model';

export class LocalCartItem {
  itemId: number;
  quantity: number;
  totalCost: number;
  pricePerItem: number;
  cartId: number;
  itemTitle: string;
  imageName: string[];
  measureValue: number;
  itemType: ProductType;

  constructor(
    cart: CartItemAddDto,
    itemCost: number,
    itemTitle: string,
    imageName: string[],
    measureValue: number,
    itemType: ProductType
  ) {
    this.itemId = cart.itemId;
    this.quantity = cart.quantity;
    this.pricePerItem = itemCost;
    this.totalCost = this.quantity * this.pricePerItem;
    this.cartId = 2025;
    this.itemTitle = itemTitle;
    this.imageName = imageName;
    this.itemType = itemType;
    this.measureValue = measureValue;
  }
}
