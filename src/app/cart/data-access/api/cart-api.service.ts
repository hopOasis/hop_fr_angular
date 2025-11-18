import { inject, Injectable, Signal } from '@angular/core';
import { CartModalStore } from '../store/cart-modal.store';
import { CartStore } from '../store/cart.store';
import { CartItemResponse } from '../models/cart-item-response.model';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private cartModalStore = inject(CartModalStore);
  private cartStore = inject(CartStore);
  private cartService = inject(CartService);
  updateState(state: boolean): void {
    this.cartModalStore.updateState(state);
  }
   get priceForAll(): Signal<number> {
    return this.cartStore.priceForAll;
  }
  triggerCartUpdate(isAuth: boolean): void {
    this.cartStore.triggerCartApdating(isAuth);
  }
  get cartId(): Signal<number> {
    return this.cartStore.cartId;
  }
  get amountOfItems(): Signal<number> {
    return this.cartStore.amountOfItems;
  }
  get cartItems(): Signal<CartItemResponse[]> {
    return this.cartStore.cartItems;
  }
  removeProduct(
    productInfo: CartItemRemoveDto,
    price: number,
    isAuth: boolean
  ): Observable<string> {
    return this.cartService.removeProduct(productInfo, price, isAuth);
  }
  addProduct(
    cart: CartItemAddDto,
    itemCost: number,
    itemTitle: string,
    isAuth: boolean
  ): Observable<CartItemResponse> {
    return this.cartService.addProduct(cart, itemCost, itemTitle, isAuth);
  }
}
