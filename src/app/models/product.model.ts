import { BeerDescription, Pageable, Sort } from './pageable.model';

interface FetchedProductData {
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
export interface BeersFetchedProductData extends FetchedProductData {
  content: BeerDescription[];
}
