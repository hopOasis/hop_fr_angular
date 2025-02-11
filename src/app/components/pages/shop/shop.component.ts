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
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);

  public currentChildRoute = signal<TypesOfProduct>('all-products');
  public currentTypeOfSorting = signal<TypesOfSorting>('');

  public isActiveSortButtons = signal(true);

  public productData = signal<undefined | ProductDescription[]>(undefined);

  public availablePages = signal(0);
  public currentPage = signal(0);
  public arrayOfPages = computed<number[]>(() => this.calculatePagination());

  ngOnInit(): void {
    const sortingType = this.activeRoute.snapshot.queryParams['sort_by'];
    if (sortingType) this.currentTypeOfSorting.set(sortingType);
    const fetchedDataSubscription = this.productsService
      .getProductData()
      .subscribe((data) => {
        this.productData.set(data.content);
        this.availablePages.set(data.totalPages);
        this.currentPage.set(data.pageable.pageNumber);
      });
    const paramsSubscription = this.activeRoute.params.subscribe(
      ({ typeCategory }) => {
        this.currentChildRoute.set(typeCategory);
        this.productsService.typeOfCategory$.next(typeCategory);
        this.onChangePage(0);
        if (this.currentTypeOfSorting()) {
          this.router.navigate(['./'], {
            queryParams: { sort_by: this.currentTypeOfSorting() },
            relativeTo: this.activeRoute,
          });
        }
      }
    );

    this.destroyRef.onDestroy(() => {
      fetchedDataSubscription.unsubscribe();
      paramsSubscription.unsubscribe();
    });
  }
  onChangePage(page: number) {
    this.productsService.pageOfProduct$.next(page);
    this.currentPage.set(page);
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
    let queryParams = {};
    if (this.currentTypeOfSorting() === type) this.currentTypeOfSorting.set('');
    else {
      this.currentTypeOfSorting.set(type);
      queryParams = { sort_by: this.currentTypeOfSorting() };
    }
    this.router.navigate(['./'], {
      queryParams: queryParams,
      relativeTo: this.activeRoute,
    });
    this.productsService.typeOfSorting$.next(this.currentTypeOfSorting());
  }
}
