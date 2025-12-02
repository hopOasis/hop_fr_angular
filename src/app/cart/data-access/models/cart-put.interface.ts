import { ProductType } from '../../../catalog/data-access/models/product-types.model';

export interface CartPut {
  cartId: number;
  items: [
    {
      itemId: number;
      quantity: number;
      measureValue: number;
      itemType: ProductType;
    }
  ];
}

export interface CartPutRes {
  cartId: 0;
  userId: 0;
  items: [
    {
      cartId: 0;
      itemId: 0;
      itemTitle: 'string';
      itemType: 'BEER';
      pricePerItem: 0;
      quantity: 0;
      totalCost: 0;
      measureValue: 0;
      imageName: ['string'];
    }
  ];
  priceForAll: 0;
}
