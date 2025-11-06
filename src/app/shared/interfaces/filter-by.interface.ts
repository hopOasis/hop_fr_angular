export interface FilterBy {
  minValue?: number;
  maxValue?: number;
  review?: number[];
  inStock?: number;
  measure?: number;
}

export type FilterType = 'inStock' | 'price' | 'rating' | 'measure' | 'null';
