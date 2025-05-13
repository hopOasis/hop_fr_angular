import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { CartService } from '../services/cart.service';
import { CartResponse } from '../models/cart-response.model';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private cartService = inject(CartService);

  getCartItems(): Observable<CartResponse> {
    return this.cartService.getCartItems();
  }

  removeCartItem(
    cartId: number | null,
    productInfo: CartItemRemoveDto
  ): Observable<string> {
    return this.cartService.removeCartItem(cartId, productInfo);
  }

  addCartItem(cart: CartItemAddDto): Observable<CartItemResponse> {
    return this.cartService.addCartItem(cart);
  }

  changeCartItemQuantity(
    cartId: number | null,
    productInfo: CartItemAddDto
  ): Observable<string> {
    return this.cartService.changeCartItemQuantity(cartId, productInfo);
  }
}
