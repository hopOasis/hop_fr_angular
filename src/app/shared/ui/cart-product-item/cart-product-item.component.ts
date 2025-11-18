import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { CartItemResponse } from '../../../cart/data-access/models/cart-item-response.model';
import { ShopService } from '../../../catalog/data-access/services/shop.service';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartProductItemComponent implements OnInit {
  private shopService = inject(ShopService);
  private destroyRef = inject(DestroyRef);
  public itemData = input.required<CartItemResponse>();
  ngOnInit(): void {
    //const dataSubscription = this.shopService.getProductItemData()
  }
}
