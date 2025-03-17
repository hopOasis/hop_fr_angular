import { inject, Injectable } from '@angular/core';
import { of, Subject, switchMap, take } from 'rxjs';
import { combineLatest, Observable } from 'rxjs';
import { FetchedProductData } from '../models/product-api-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SortingTypes } from '../models/sorting-types.model';
import { ProductDescription } from '../models/product-description.model';
import { CatalogStoreData } from '../models/store-data.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private httpClient = inject(HttpClient);
  public typeOfSorting$ = new Subject<SortingTypes>();
  public typeOfCategory$ = new Subject<string>();
  public pageOfProduct$ = new Subject<number>();
  getProductItemData(
    productType: string,
    productId: number
  ): Observable<ProductDescription> {
    return this.httpClient.get<ProductDescription>(
      `${environment.apiUrl}/${productType}/${productId}`
    );
  }
  getProductList(data: CatalogStoreData): Observable<FetchedProductData> {
    return combineLatest([
      of(data.sortDirection),
      of(data.productCategory),
      of(data.page),
    ]).pipe(
      take(1),
      switchMap(([typeOfSorting, typeOfCategory, page]) => {
        let params = new HttpParams();
        if (typeOfSorting) params = params.set('sortDirection', typeOfSorting);
        if (page) params = params.set('page', page);
        return this.httpClient.get<FetchedProductData>(
          `${environment.apiUrl}/${typeOfCategory}`,
          {
            params,
          }
        );
      })
    );
  }
}
