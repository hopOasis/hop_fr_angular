import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../ui/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../ui/pagination/pagination.component';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { ShopService } from '../../data-access/services/shop.service';
import { FetchedProductData } from '../../../core/data-access/models/product-api-response.model';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { selectCartItems } from '../../../core/data-access/state/store/cart/cart.selectors';

import { ProductDescription } from '../../../core/data-access/models/product-description.model';

import { CartItemResponse } from '../../../core/data-access/cart/models/cart-item-response.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    PaginationComponent,
    NavigationComponent,
    ProductCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private shopService = inject(ShopService);
  public productData = signal<FetchedProductData | null>(null);
  public isFetching = signal(false);
  public currentPage = signal(0);
  public availablePages = signal(0);
  private store = inject<Store<StoreData>>(Store);
  public cartData$ = this.store.select(selectCartItems);
  public allCartData = signal<CartItemResponse[]>([]);
  itemInCart(product: ProductDescription): CartItemResponse[] | null {
    return (
      this.allCartData().filter((item) => item.itemId === product.id) ?? null
    );
  }
  ngOnInit(): void {
    const cartSubscription = this.cartData$.subscribe((data) => {
      this.allCartData.set(data);
    });
    const productSubscription = this.shopService.getProductList().subscribe({
      next: (data) => {
        this.isFetching.set(false);
        this.productData.set(data);
        this.availablePages.set(data.totalPages);
      },
    });

    this.destroyRef.onDestroy(() => {
      productSubscription.unsubscribe();
      cartSubscription.unsubscribe();
    });
  }
}
