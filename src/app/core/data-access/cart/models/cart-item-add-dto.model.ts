import { CartItemRemoveDto } from './cart-item-remove-dto.model';

export interface CartItemAddDto extends CartItemRemoveDto {
  quantity: number;
}
