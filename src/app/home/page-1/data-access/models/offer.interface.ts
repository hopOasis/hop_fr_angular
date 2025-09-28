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

export interface OfferStoreData {
  productData: ProductDescription[] | null;
  step: number;
  startIndex: number;
  disabledLeft: boolean;
  disabledRight: boolean;
  loading: boolean;
  error: boolean;
}
