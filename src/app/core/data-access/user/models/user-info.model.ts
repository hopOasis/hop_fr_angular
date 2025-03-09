import { OrderInfo } from './order-info.model';

export interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  orders: OrderInfo[];
}
