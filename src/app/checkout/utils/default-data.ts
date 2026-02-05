import { DeliveryDataReq } from '../interfaces/delivery.interface';

export const defaultDeliveryDataReq: DeliveryDataReq = {
  deliveryAddress: '',
  customerPhoneNumber: '',
  paymentType: 'CASH',
  deliveryMethod: 'POST_OFFICE',
  deliveryPostalCode: '00000',
  orderStatus: 'ACCEPTED',
  cancellationReason: '',
};
