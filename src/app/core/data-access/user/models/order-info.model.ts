import { OrderItemInfo } from "./order-item-info.model";

export interface OrderInfo {
  id: number;
  orderNumber: string;
  paymentType: string;
  customerPhoneNumber: string;
  deliveryType: string;
  deliveryMethod: string;
  deliveryAddress: string;
  createdAt: string;
  deliveryStatus: string;
  totalPrice: number;
  items: OrderItemInfo[];
}