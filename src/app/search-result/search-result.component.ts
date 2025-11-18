import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbComponent } from '../catalog/ui/breadcrumb/breadcrumb.component';
import { BreadCrumb } from '../catalog/data-access/models/bread-crumb.model';
import { ProductCardComponent } from '../catalog/ui/product-card/product-card.component';
import { ProductDescription } from '../catalog/data-access/models/product-description.model';
import { PaginationComponent } from '../catalog/ui/pagination/pagination.component';
import { FilterComponent } from '../shared/ui/filter/filter.component';
import { SortingComponent } from '../shared/ui/sorting/sorting.component';
import { SearchStore } from '../shared/ui/search-bar/data-access/search.store';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ProductCardComponent,
    PaginationComponent,
    FilterComponent,
    SortingComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  providers: [SearchStore],
})
export class SearchResultComponent {
  private readonly route = inject(ActivatedRoute);
  public searchStore = inject(SearchStore);

  public availablePages = computed(() =>
    Math.floor(this.productData().length / 6)
  );

  productData = signal<ProductDescription[]>([]);
  searchWord = signal('');
  isOpened = signal(false);

  breadcrumb = computed<BreadCrumb>(() => ({
    currentPathName: `результати пошуку для ${this.searchWord()}`,
    linksList: [{ title: 'Khmilna Oaza', linkPath: '/home' }],
  }));

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('icon-search')) {
      this.getSearchResult();
    }
  }

  @HostListener('document:keyup', ['$event']) keyEnter(event: KeyboardEvent) {
    const elem = event.target as HTMLElement;

    if (event.key === 'Enter' && elem.classList.contains('search__input')) {
      this.getSearchResult();
    }
  }

  constructor() {
    this.getSearchResult();
  }

  getSearchResult() {
    const queryParams = this.route.snapshot.queryParams;
    this.productData.set([]);

    queryParams['searchWord']
      ? this.searchWord.set(queryParams['searchWord'])
      : this.searchWord.set('');

    this.searchStore.getData(this.searchWord());
  }

  sortBy(value: string) {
    console.log(value);
  }

  opened(state: boolean) {
    this.isOpened.set(state);
  }
}
