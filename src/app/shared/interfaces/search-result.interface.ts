export interface SearchResult {
  id: number | string;
  imageUrl: string | undefined;
  description: string;
  price: number;
  amount: number | undefined;
  name: string | undefined;
  itemType: string;
  averageRating: number;
  quantity: number;
}
