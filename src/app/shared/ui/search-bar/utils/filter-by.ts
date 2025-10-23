import { SearchResult } from '../../../interfaces/search-result.interface';

export const filterByPrice = (
  filterData: SearchResult[],
  minValue: number,
  maxValue: number
) =>
  filterData.filter((item) => item.price >= minValue && item.price <= maxValue);
