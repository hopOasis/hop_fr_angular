import { Injectable } from '@angular/core';
import { LocalCart } from '../models/local-cart.class';
import { CartItemRemoveDto } from '../models/cart-item-remove-dto.model';
import { Observable, of, throwError } from 'rxjs';
import { CartItemResponse } from '../models/cart-item-response.model';
import { LocalCartItem } from '../models/local-cart-item.class';
import { CartResponse } from '../models/cart-response.model';
import { CartItemAddDto } from '../models/cart-item-add-dto.model';

@Injectable({ providedIn: 'root' })
export class LocalCartService {
  getCartData(): CartResponse | null {
    let data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : null;
  }
  updateLocalCart(): LocalCart {
    let localCart = this.getCartData();
    let newCart = new LocalCart();
    if (localCart)
      newCart = new LocalCart(localCart.priceForAll, localCart.items);
    return newCart;
  }
  removeProduct(
    productInfo: CartItemRemoveDto,
    price: number
  ): Observable<string> {
    let localCart = this.updateLocalCart();
    let result = localCart.removeItem(productInfo, price);
    if (!result) return throwError(() => 'Такого товару немає в корзині');
    localStorage.setItem('cart', JSON.stringify(localCart));
    return of('Товар видалено з корзини');
  }
  addProduct(
    cart: CartItemAddDto,
    itemCost: number,
    itemTitle: string
  ): Observable<CartItemResponse> {
    let newCart = this.updateLocalCart();
    let checkExisting = newCart.items.some(
      (product) =>
        product.itemId === cart.itemId && product.pricePerItem === itemCost
    );
    if (checkExisting) return throwError(() => 'Товар вже доданий до корзини');
    let newProductItem: CartItemResponse = new LocalCartItem(
      cart,
      itemCost,
      itemTitle
    );
    newCart.setItem(newProductItem);
    localStorage.setItem('cart', JSON.stringify(newCart));
    return of(newProductItem);
  }
}
