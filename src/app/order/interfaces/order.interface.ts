import { ProductType } from '../../catalog/data-access/models/product-types.model';

export type Payment = 'CASH' | 'ONLINE';
export type DeliveryMethod = 'COURIER' | 'POST_OFFICE' | 'PARCEL_TERMINAL';
export type OrderStatus =
  | 'PROCESSING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';
export type PaymentStatus = 'PAID' | 'NOT_PAID';

export interface ProductItem {
  id: number;
  itemTitle: string;
  itemType: ProductType;
  quantity: number;
  measureValue: number;
  price: number;
}

export interface OrderRes {
  id: number;
  userId: number;
  orderNumber: string;
  paymentType: Payment;
  customerPhoneNumber: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  createdAt: Date;
  orderStatus: OrderStatus;
  cancellationReason: string;
  totalPrice: number;
  totalWeight: number;
  shippingPrice: number;
  items: ProductItem[];
  paymentStatus: PaymentStatus;
}
