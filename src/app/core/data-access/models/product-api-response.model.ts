import { ProductDescription } from './product-description.model';
import { ProductPaginationInfo } from './product-pagination.model';
import { ProductReview } from './product-review.model';

export interface FetchedProductData {
  content: ProductDescription[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: ProductPaginationInfo;
  size: number;
  sort: ProductReview;
  totalElements: number;
  totalPages: number;
}
