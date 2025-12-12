export const ORDERSTATUS = {
  PROCESSING: 'В процесі',
  ACCEPTED: 'Прийнятий',
  IN_PROGRESS: 'В обробці',
  DELIVERED: 'Доставлений',
  COMPLETED: 'Завершений',
  CANCELLED: 'Відмінений',
} as const;

export type OrderStatus = (typeof ORDERSTATUS)[keyof typeof ORDERSTATUS];
export type OrderStatusKey = keyof typeof ORDERSTATUS;

export const DELIVERYMETHOD = {
  COURIER: "Кур'єр",
  POST_OFFICE: 'Пошта',
  PARCEL_TERMINAL: 'Поштомат',
} as const;

export type DeliveryMethod =
  (typeof DELIVERYMETHOD)[keyof typeof DELIVERYMETHOD];

export type DeliveryMethodKey = keyof typeof DELIVERYMETHOD;

export const PAYMENT = {
  CASH: 'Готівкою',
  ONLINE: 'Карткою',
} as const;
export type PaymentType = (typeof PAYMENT)[keyof typeof PAYMENT];
export type PaymentTypeKey = keyof typeof PAYMENT;
