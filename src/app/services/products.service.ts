import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { combineLatest, Observable, Subject, switchMap } from 'rxjs';
import { TypesOfProduct, TypesOfSorting } from '../models/products-types.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FetchedProductData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private BASE_URL = this.authService.BASE_URL;
  public typeOfSorting$ = new Subject<TypesOfSorting>();
  public typeOfCategory$ = new Subject<TypesOfProduct>();
  getProductData(): Observable<FetchedProductData> {
    return combineLatest([this.typeOfSorting$, this.typeOfCategory$]).pipe(
      switchMap(([typeOfSorting, typeOfCategory]) => {
        const params = new HttpParams().set('sortDirection', typeOfSorting);
        return this.httpClient.get<FetchedProductData>(
          `${this.BASE_URL()}/${typeOfCategory}`,
          { params: params }
        );
      })
    );
  }
}
