import {
  ChangeDetectionStrategy,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SortingTypes } from '../../data-access/models/sorting-types.model';
import { CatalogStore } from '../../data-access/store/catalog.store';
import { SortingComponent } from '../../../shared/ui/sorting/sorting.component';
import { SelectOption } from '../../../shared/interfaces/select-option.interface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SortingComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  readonly catalogStore = inject(CatalogStore);
  public productRoutes = new Set(['all-products', 'beers', 'snacks', 'ciders']);
  public currentPage = this.catalogStore.page;
  public currentTypeOfProduct = this.catalogStore.productCategory;
  public currentTypeOfSorting = this.catalogStore.sortDirection;

  selectOptions = signal<SelectOption[]>([
    { value: '', text: 'Сортувати від', selected: true },
    { value: 'asc', text: 'Дешевих' },
    { value: 'desc', text: 'Дорогих' },
  ]);

  onChangeType(type: SortingTypes | string) {
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

    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ typeOfProduct }) => {
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
      });

    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ sort_by, page }) => {
        this.catalogStore.updateInfo({
          page: page,
          sortDirection: sort_by,
        });
      });
  }
}
