import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';

export const offerFilter = (
  offers: ProductDescription[],
): ProductDescription[] => {
  const filtered: ProductDescription[] = [];

  for (const offer in offers) {
    if (
      offers[offer].options[0].quantity > 0 ||
      offers[offer].options[1]?.quantity
    ) {
      filtered.push(offers[offer]);
    }
  }

  return filtered;
};
