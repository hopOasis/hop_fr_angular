import { inject, Injectable } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { combineLatest, debounceTime, Observable } from 'rxjs';
import { FetchedProductData } from '../../../core/data-access/models/product-api-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SortingTypes } from '../models/sorting-types.model';
import { ProductDescription } from '../../../core/data-access/models/product-description.model';
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
  getProductList(): Observable<FetchedProductData> {
    return combineLatest([
      this.typeOfSorting$,
      this.typeOfCategory$,
      this.pageOfProduct$,
    ]).pipe(
      debounceTime(400),
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
