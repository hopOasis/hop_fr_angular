import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';

export interface Offer {
  id: number;
  name: string;
  active: boolean;
  specialOfferBeers: ProductDescription[];
  specialOfferCiders: ProductDescription[];
  specialOfferSnacks: ProductDescription[];
  specialOfferProductBundles: ProductDescription[];
}
