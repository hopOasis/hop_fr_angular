import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { TypesOfProduct, TypesOfSorting } from '../models/products-types.model';
import { HttpClient } from '@angular/common/http';
import { FetchedProductData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private authService = inject(AuthService);
  private BASE_URL = this.authService.BASE_URL;
  public typeOfProduct$ = new Subject<TypesOfProduct>();
  public typeOfSorting$ = new BehaviorSubject<TypesOfSorting>('asc');
  private httpClient = inject(HttpClient);

  getProducts(): Observable<FetchedProductData> {
    return combineLatest([this.typeOfProduct$, this.typeOfSorting$]).pipe(
      switchMap(([typesOfProduct, typesOfSorting]) => {
        if (typesOfProduct === 'all-products') {
          return this.httpClient.get<FetchedProductData>(
            `${this.BASE_URL()}/beers`
          );
        } else {
          return this.httpClient.get<FetchedProductData>(
            `${this.BASE_URL()}/${typesOfProduct}`,
            {
              params: { sortDirection: typesOfSorting },
            }
          );
        }
      })
    );
  }
}
