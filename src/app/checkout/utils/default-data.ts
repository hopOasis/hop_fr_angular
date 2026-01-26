import { DeliveryDataReq } from '../interfaces/delivery.interface';

export const defaultDeliveryDataReq: DeliveryDataReq = {
  deliveryAddress: '',
  customerPhoneNumber: '',
  paymentType: 'CASH',
  deliveryMethod: 'POST_OFFICE',
  deliveryPostalCode: '',
  orderStatus: 'ACCEPTED',
  cancellationReason: '',
};
