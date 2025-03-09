import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import {
  selectCartCosts,
  selectCartItems,
} from '../../../core/data-access/state/store/cart/cart.selectors';
import { CartItemResponse } from '../../../core/data-access/cart/models/cart-item-response.model';
import { CartProductItemComponent } from '../../ui/cart-product-item/cart-product-item.component';
import { UpdatePricePipe } from '../../../shop/utils/update-price.pipe';
import { RouterLink } from '@angular/router';
import { cartModalState } from '../../../core/data-access/state/store/cart-modal/cart-modal.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductItemComponent,UpdatePricePipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject<Store<StoreData>>(Store);
  public data = signal<CartItemResponse[]>([]);
  public fullCost = signal(0);
  //public fullProductData = signal<null | ProductDescription>(null);
   onCloseModal() {
      
        this.store.dispatch(cartModalState({ isOpened: false }));
    }
  ngOnInit(): void {
    const cartSubscription = this.store
      .select(selectCartItems)
      .subscribe((data) => this.data.set(data));
    const cartCostsSubscription = this.store
      .select(selectCartCosts)
      .subscribe((value) => this.fullCost.set(value));
    this.destroyRef.onDestroy(() => {
      cartSubscription.unsubscribe();
      cartCostsSubscription.unsubscribe();
    });
  }
}
