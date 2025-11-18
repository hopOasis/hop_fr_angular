import { Injectable, signal } from '@angular/core';

import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';
import { FilterType } from '../../../interfaces/filter-by.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchResultSignalService {
  private searchResultData = signal<ProductDescription[]>([]);
  public filteredSearch = signal<ProductDescription[]>([]);

  setData(result: ProductDescription[]) {
    this.searchResultData.set(result);
  }

  getData(): ProductDescription[] {
    return this.searchResultData();
  }

  filtered(filter: FilterType, ...args: number[]): ProductDescription[] {
    switch (filter) {
      case 'inStock':
        return this.getData();
      case 'price':
        const [minPrice, maxPrice] = args;
        this.filteredSearch.update(
          (filtered) => (
            this.getData().filter((data) => {
              const filteredData = [];
              for (const item of data.options) {
                if (item.price >= minPrice && item.price <= maxPrice)
                  filteredData.push(data);
              }
              return filteredData;
            }),
            [...filtered]
          )
        );
        return this.filteredSearch();
      case 'rating':
        return this.getData().sort((a, b) => a.averageRating - b.averageRating);
      case 'measure':
        return this.getData();
      default:
        return this.getData();
    }
  }
}
