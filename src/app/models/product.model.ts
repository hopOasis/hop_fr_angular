import { Pageable, ProductDescription, Sort } from './pageable.model';

export interface FetchedProductData {
  content: ProductDescription[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
