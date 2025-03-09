import { ProductSorting } from './product-sorting.model';

export interface ProductPaginationInfo {
  pageNumber: number;
  pageSize: number;
  sort: ProductSorting;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
