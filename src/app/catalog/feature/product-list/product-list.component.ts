import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../ui/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../ui/pagination/pagination.component';
import { NavigationComponent } from '../../ui/navigation/navigation.component';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { CatalogDataStore } from '../../data-access/store/catalog-data.store';

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
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  readonly catalogDataStore = inject(CatalogDataStore);
  public availablePages = this.catalogDataStore.availablePages;
  public productData = this.catalogDataStore.productData;
}
