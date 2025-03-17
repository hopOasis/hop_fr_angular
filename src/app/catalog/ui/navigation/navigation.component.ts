import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SortingTypes } from '../../data-access/models/sorting-types.model';
import { CatalogStore } from '../../data-access/store/catalog.store';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public destroyRef = inject(DestroyRef);
  readonly catalogStore = inject(CatalogStore);
  public productRoutes = new Set(['all-products', 'beers', 'snacks', 'ciders']);
  public currentPage = this.catalogStore.page;
  public currentTypeOfProduct = this.catalogStore.productCategory;
  public currentTypeOfSorting = this.catalogStore.sortDirection;

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
    this.catalogStore.updateInfo({
      page: page ? page : 0,
      sortDirection: sort_by,
      productCategory: typeOfProduct ? typeOfProduct : 'all-products',
    });
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
          this.catalogStore.updateInfo({
            productCategory: typeOfProduct,
            sortDirection: undefined,
          });
          this.navigatePage('all-products');
          return;
        }
        if (this.currentPage()) {
          this.catalogStore.updateInfo({
            page: 0,
            productCategory: typeOfProduct,
          });
          this.navigatePage(typeOfProduct);
          return;
        }
        this.catalogStore.updateInfo({
          productCategory: typeOfProduct,
        });
      }
    );
    const queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      ({ sort_by, page }) => {
        this.catalogStore.updateInfo({
          page: page,
          sortDirection: sort_by,
        });
      }
    );
    this.destroyRef.onDestroy(() => {
      paramsSubscription.unsubscribe();
      queryParamSubscription.unsubscribe();
    });
  }
}
