import { ProductType } from '../../models/product-types.model';

export interface CartItemRemoveDto {
  itemId: number;
  itemType: ProductType;
  measureValue: number;
}
