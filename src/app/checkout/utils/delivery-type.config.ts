interface DeliveryItemsType {
  'Нова пошта (відділення)': string;
  "Нова пошта (кур'єр)": string;
  'Нова пошта (поштомат)': string;
  'Укрпошта (відділення)': string;
  default: string;
}

export const deliveryTypeItems = [
  'Нова пошта (відділення)',
  "Нова пошта (кур'єр)",
  'Нова пошта (поштомат)',
  'Укрпошта (відділення)',
];

export const deliveryTypePrices = [5, 10, 'безкоштовно', 10];

export const deliveryItems: DeliveryItemsType = {
  'Нова пошта (відділення)': 'npd',
  "Нова пошта (кур'єр)": 'npc',
  'Нова пошта (поштомат)': 'npp',
  'Укрпошта (відділення)': 'uap',
  default: 'default',
} as const;

export type DeliveryItems = (typeof deliveryItems)[keyof typeof deliveryItems];
export type DeliveryItemsKey = keyof typeof deliveryItems;

export const deliveryTypes = ['default', 'npd', 'npc', 'npp', 'uap'];
