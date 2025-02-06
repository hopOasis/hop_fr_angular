import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { TypesOfSorting } from '../models/products-types.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BeersFetchedProductData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private BASE_URL = this.authService.BASE_URL;
  public typeOfSorting$ = new Subject<TypesOfSorting>();

  getBeersData(): Observable<BeersFetchedProductData> {
    return this.typeOfSorting$.pipe(
      switchMap((typeOfSorting) => {
        const baseParams = new HttpParams().set('sortDirection', typeOfSorting);
        return this.httpClient.get<BeersFetchedProductData>(
          `${this.BASE_URL()}/beers`,
          { params: baseParams }
        );
      })
    );
  }
  
}
