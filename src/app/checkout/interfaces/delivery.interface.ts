import { OrderStatusKey } from '../../order/utils/order.config';

export type Direction = 'up' | 'down';

export type Payment = 'CASH' | 'ONLINE';

export interface DeliveryDataReq {
  customerPhoneNumber: string;
  paymentType: Payment;
  deliveryMethod: string;
  deliveryAddress: string;
  deliveryPostalCode: string;
  orderStatus: OrderStatusKey;
  cancellationReason: string;
}

export interface DeliveryData {
  userName: string;
  userSurname: string;
  city: string;
  deliveryPoint: string;
  appartment: string;
  streetNum: string;
}
