import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, combineLatest } from 'rxjs';
import { Observable, Subject, switchMap } from 'rxjs';
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
  public typeOfSorting$ = new BehaviorSubject<TypesOfSorting | ''>('');
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
        let params = new HttpParams();
        if (typeOfSorting) params = params.set('sortDirection', typeOfSorting);
        if (page) params = params.set('page', page);
        return this.httpClient.get<FetchedProductData>(
          `${this.BASE_URL()}/${typeOfCategory}`,
          { params }
        );
      }),
      catchError(() => {
        this.router.navigate(['not_found']);
        throw new Error('Something went wrong!');
      })
    );
  }
}
