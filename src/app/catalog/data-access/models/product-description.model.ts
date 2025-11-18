import { ProductOption } from "./product-oprion";
import { ProductReview } from "./product-review.model";
import { ProductType } from "./product-types.model";


export interface ProductDescription {
  averageRating: number;
  description: string;
  id: number;
  imageName?: string[];
  itemType: ProductType;
  options: ProductOption[];
  ratingCount: number;
  reviews: ProductReview[];
  specialOfferIds: [];
  beerColor?: string;
  beerName?: string;
  name?: string;
  ciderName?: string;
  ciderImageName?: string[];
  snackName?: string;
  snackImageName?: string[];
}
