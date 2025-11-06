import { ProductType } from '../../../catalog/data-access/models/product-types.model';

export interface CartItemRemoveDto {
  itemId: number;
  itemType: ProductType;
  measureValue: number;
}
