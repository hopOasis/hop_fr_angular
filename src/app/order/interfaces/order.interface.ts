import { ProductType } from '../../catalog/data-access/models/product-types.model';
import {
  DeliveryMethodKey,
  OrderStatusKey,
  PaymentTypeKey,
} from '../utils/order.config';

export type PaymentStatus = 'PAID' | 'NOT_PAID';

export interface ProductItem {
  id: number;
  itemTitle: string;
  itemType: ProductType;
  quantity: number;
  measureValue: number;
  price: number;
  imageName: string;
}

export interface OrderRes {
  id: number;
  userId: number;
  orderNumber: string;
  paymentType: PaymentTypeKey;
  customerPhoneNumber: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  deliveryMethod: DeliveryMethodKey;
  deliveryAddress: string;
  createdAt: Date;
  orderStatus: OrderStatusKey;
  cancellationReason: string;
  totalPrice: number;
  totalWeight: number;
  shippingPrice: number;
  items: ProductItem[];
  paymentStatus: PaymentStatus;
}

export interface OrderItem extends OrderRes {
  isDetails: boolean;
}
