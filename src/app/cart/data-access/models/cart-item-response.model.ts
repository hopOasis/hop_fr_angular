import { ProductType } from '../../../catalog/data-access/models/product-types.model';

export interface CartItemResponse {
  cartId: number;
  itemId: number;
  itemTitle: string;
  itemType: ProductType;
  pricePerItem: number;
  quantity: number;
  totalCost: number;
}
