export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
export interface Option {
  id: number;
  volume?: number;
  weight?: number;
  measureValue?: number;
  quantity: number;
  price: number;
}
export interface Reviews {
  content: string;
  createdAt: string;
  firstName: string;
  id: number;
  itemId: number;
  itemType: string;
  lastName: string;
  userId: number;
}
export interface ProductDescription {
  averageRating: number;
  description: string;
  id: number;
  imageName?: string[];
  itemType: string;
  options: Option[];
  ratingCount: number;
  reviews: Reviews[];
  specialOfferIds: [];
  beerColor?: string;
  beerName?: string;
  name?: string;
  ciderName?: string;
  ciderImageName?: string[];
  snackName?: string;
  snackImageName?: string[];
}
