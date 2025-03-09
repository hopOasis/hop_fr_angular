import { model, OnInit, signal } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../data-access/services/shop.service';
import { SortingTypes } from '../../data-access/models/sorting-types.model';
import { FetchedProductData } from '../../../core/data-access/models/product-api-response.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public destroyRef = inject(DestroyRef);
  private shopService = inject(ShopService);
  public productData = model.required<boolean>();
  public productRoutes = new Set(['all-products', 'beers', 'snacks', 'ciders']);
  public currentPage = model.required<number>();
  public currentTypeOfProduct = signal('all-products');
  public currentTypeOfSorting = signal<SortingTypes>(undefined);

  onChangeType(type: SortingTypes) {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: { sort_by: type },
    });
  }
  checkForParams() {
    const { typeOfProduct } = this.activatedRoute.snapshot.params;
    const { page, sort_by } = this.activatedRoute.snapshot.queryParams;
    this.currentTypeOfProduct.set(typeOfProduct ?? 'all-products');
    this.currentTypeOfSorting.set(sort_by);
    this.currentPage.set(page ?? 0);
    this.productData.set(true);
    this.shopService.pageOfProduct$.next(this.currentPage());
    this.shopService.typeOfCategory$.next(this.currentTypeOfProduct());
    this.shopService.typeOfSorting$.next(this.currentTypeOfSorting());
    this.navigatePage(this.currentTypeOfProduct());
  }
  navigatePage(typeOfProduct: string) {
    this.router.navigate([`/shop/${typeOfProduct}`], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: this.currentPage(),
        sort_by: this.currentTypeOfSorting(),
      },
    });
  }
  ngOnInit(): void {
    this.checkForParams();
    const paramsSubscription = this.activatedRoute.params.subscribe(
      ({ typeOfProduct }) => {
        if (!this.productRoutes.has(typeOfProduct))
          return this.navigatePage('all-products');
        else if (
          typeOfProduct === 'all-products' &&
          this.currentTypeOfSorting()
        ) {
          this.currentTypeOfProduct.set(typeOfProduct);
          this.currentTypeOfSorting.set(undefined);
          this.shopService.typeOfCategory$.next(typeOfProduct);
          return this.navigatePage('all-products');
        }
        if (this.currentPage()) {
          this.currentPage.set(0);
          this.productData.set(true);
          this.shopService.pageOfProduct$.next(0);
          this.navigatePage(typeOfProduct);
          this.currentTypeOfProduct.set(typeOfProduct);
          this.shopService.typeOfCategory$.next(typeOfProduct);
          return;
        }
        this.productData.set(true);
        this.currentTypeOfProduct.set(typeOfProduct);
        this.shopService.typeOfCategory$.next(typeOfProduct);
      }
    );

    const queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      ({ sort_by, page }) => {
        this.currentPage.set(page);
        this.currentTypeOfSorting.set(sort_by);
        this.productData.set(true);
        this.shopService.pageOfProduct$.next(page);
        this.shopService.typeOfSorting$.next(sort_by);
      }
    );
    this.destroyRef.onDestroy(() => {
      paramsSubscription.unsubscribe();
      queryParamSubscription.unsubscribe();
    });
  }
}
