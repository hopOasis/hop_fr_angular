import { computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesOfSorting } from '../../../models/products-types.model';
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

  public currentChildRoute = signal<string>('all-products');
  public currentTypeOfSorting = signal<TypesOfSorting>('asc');

  public isActiveSortButtons = signal(true);

  public productData = signal<undefined | ProductDescription[]>(undefined);

  public availablePages = signal(1);
  public arrayOfPages = computed<number[]>(() => {
    let arr = [];
    if (this.availablePages() <= 5 || this.currentPage() < 2)
      for (let i = 1; i <= this.availablePages(); i++) {
        arr.push(i);
      }
    else
      for (let i = this.currentPage() - 2; i <= 5; i++) {
        arr.push(i);
      }

    return arr;
  });
  public currentPage = signal(0);
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
        this.currentChildRoute.set(typeCategory);
      }
    );
    const queryParamsSubscription = this.activeRoute.queryParams.subscribe(
      ({ sort_by }) => {
        if (!sort_by && this.currentChildRoute() !== 'all-products') {
          this.router.navigate(['./'], {
            queryParams: { sort_by: this.currentTypeOfSorting() },
            relativeTo: this.activeRoute,
          });
        }
        this.productsService.typeOfSorting$.next(sort_by);
      }
    );
    this.destroyRef.onDestroy(() => {
      fetchedDataSubscription.unsubscribe();
      paramsSubscription.unsubscribe();
      queryParamsSubscription.unsubscribe();
    });
  }
  onChangePage(page: number) {
    this.productsService.pageOfProduct$.next(page);
    this.currentPage.set(page);
  }
  onChangeType(type: TypesOfSorting) {
    this.currentChildRoute.set(
      this.activeRoute.snapshot.params['typeCategory']
    );
    this.currentTypeOfSorting.set(type);
    this.router.navigate(['./'], {
      queryParams: { sort_by: this.currentTypeOfSorting() },
      relativeTo: this.activeRoute,
    });
  }
}
