import { SortingTypes } from "./sorting-types.model";
export interface CatalogStoreData {
  page: number;
  productCategory: string;
  sortDirection: SortingTypes;
}
export interface NotRequiredData{
  page?: number;
  productCategory?: string;
  sortDirection?: SortingTypes;
}