import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { TypesOfProduct, TypesOfSorting } from '../models/products-types.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FetchedProductData } from '../models/product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private BASE_URL = this.authService.BASE_URL;
  public typeOfSorting$ = new Subject<TypesOfSorting>();
  public typeOfCategory$ = new Subject<TypesOfProduct>();
  public pageOfProduct$ = new BehaviorSubject(0);
  private router = inject(Router);
  getProductData(): Observable<FetchedProductData> {
    return combineLatest([
      this.typeOfSorting$,
      this.typeOfCategory$,
      this.pageOfProduct$,
    ]).pipe(
      switchMap(([typeOfSorting, typeOfCategory, page]) => {
        const params = new HttpParams()
          .set('sortDirection', typeOfSorting)
          .set('page', page);
        return this.httpClient.get<FetchedProductData>(
          `${this.BASE_URL()}/${typeOfCategory}`,
          { params: params }
        );
      }),
      catchError((error, obs) => {
        this.router.navigate(['not_found']);
        throw new Error('Something went wrong!');
      })
    );
  }
}
