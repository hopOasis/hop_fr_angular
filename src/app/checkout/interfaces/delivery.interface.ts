import { OrderStatusKey } from '../../order/utils/order.config';

export type Direction = 'up' | 'down';
export type Payment = 'CASH' | 'ONLINE';
export type DeliveryMethod = 'COURIER' | 'POST_OFFICE' | 'PARCEL_TERMINAL';

export interface DeliveryDataReq {
  customerPhoneNumber: string;
  paymentType: Payment;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  deliveryPostalCode: string;
  orderStatus: OrderStatusKey;
  cancellationReason: string;
}

export interface DeliveryData {
  firstName: string;
  lastName: string;
  city: string;
  deliveryPoint: string;
  appartment: string;
  streetNum: string;
  phone: string;
  email: string;
}
