import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FetchedProductData } from '../../../catalog/data-access/models/product-api-response.model';
import { ProductDescription } from '../../../catalog/data-access/models/product-description.model';

@Injectable()
export class GetProductsService {
  private httpClient = inject(HttpClient);
  private readonly url = environment.apiUrl;

  getProducts(): Observable<ProductDescription[]> {
    return this.httpClient
      .get<FetchedProductData>(`${this.url}/beers`)
      .pipe(map((item) => item.content));
  }
}
