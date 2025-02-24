import { computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TypesOfProduct,
  TypesOfSorting,
} from '../../../models/products-types.model';
import { ProductsService } from '../../../services/products.service';
import { ProductDescription } from '../../../models/pageable.model';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { Params } from '../../../models/shop-params.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ProductCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);

  public currentChildRoute = signal<TypesOfProduct | undefined>(undefined);
  public currentTypeOfSorting = signal<TypesOfSorting>('');

  public isActiveSortButtons = signal(true);

  public productData = signal<undefined | ProductDescription[]>(undefined);
  public availablePages = signal(0);
  public currentPage = signal(0);
  public arrayOfPages = computed<number[]>(() => this.calculatePagination());

  ngOnInit(): void {
    const { sort_by, page } = this.activeRoute.snapshot.queryParams as {
      sort_by: TypesOfSorting | null;
      page: string | null;
    };
    if (page) this.currentPage.set(+page - 1);
    if (sort_by) this.currentTypeOfSorting.set(sort_by);

    const fetchedDataSubscription = this.productsService
      .getProductData()
      .subscribe((data) => {
        this.productData.set(data.content);
        this.availablePages.set(data.totalPages);
        this.currentPage.set(data.pageable.pageNumber);
      });

    this.productData.set(undefined);
    this.productsService.pageOfProduct$.next(this.currentPage());

    const paramsSubscription = this.activeRoute.params.subscribe(
      ({ typeCategory }) => {
        this.currentChildRoute.set(typeCategory);
        this.navigatePage();
        this.productData.set(undefined);
        this.productsService.typeOfCategory$.next(typeCategory);
      }
    );

    this.destroyRef.onDestroy(() => {
      fetchedDataSubscription.unsubscribe();
      paramsSubscription.unsubscribe();
    });
  }
  navigatePage() {
    this.router.navigate(['./'], {
      relativeTo: this.activeRoute,
      queryParams: this.createParams(this.currentTypeOfSorting()),
    });
  }
  createParams(sort_by: string | null) {
    let params: Params = { page: this.currentPage() + 1 };
    if (sort_by) params.sort_by = sort_by;
    return params;
  }
  onChangePage(page: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.productData.set(undefined);
    this.productsService.pageOfProduct$.next(page);
    this.currentPage.set(page);
    this.navigatePage();
  }
  calculatePagination() {
    let arr = [];
    let counter = 5;
    if (this.availablePages() <= 5 || this.currentPage() <= 2) {
      for (let i = 1; i <= this.availablePages() && counter; i++) {
        arr.push(i);
        counter--;
      }
      return arr;
    }

    for (let i = this.currentPage() + 1; i <= this.currentPage() + 3; i++) {
      if (i <= this.availablePages()) {
        arr.push(i);
        counter--;
      }
    }
    for (let i = this.currentPage(); i > 0; i--) {
      if (counter) {
        arr.push(i);
        counter--;
      }
    }
    arr = arr.sort((a, b) => a - b);
    return arr;
  }
  onChangeType(type: TypesOfSorting) {
    this.currentChildRoute.set(
      this.activeRoute.snapshot.params['typeCategory']
    );
    if (this.currentTypeOfSorting() === type) this.currentTypeOfSorting.set('');
    else this.currentTypeOfSorting.set(type);

    this.navigatePage();
    this.productData.set(undefined);
    this.productsService.typeOfSorting$.next(this.currentTypeOfSorting());
  }
}
