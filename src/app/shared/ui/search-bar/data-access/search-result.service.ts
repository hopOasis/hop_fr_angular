import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FetchedProductData } from '../../../../catalog/data-access/models/product-api-response.model';
import { environment } from '../../../../environments/environment';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';
import { trimmedLowerCase } from './trimmedLower';

@Injectable()
export class SearchResultService {
  private httpClient = inject(HttpClient);
  private readonly URL = environment.apiUrl;

  getAllProducts(searchWord: string): Observable<ProductDescription[]> {
    if (searchWord.length < 3) {
      return this.httpClient
        .get<FetchedProductData>(`${this.URL}/all-products?size=100`)
        .pipe(map(() => []));
    }
    return this.httpClient
      .get<FetchedProductData>(`${this.URL}/all-products?size=100`)
      .pipe(
        map((products) =>
          products.content.filter(
            (product) =>
              trimmedLowerCase(product.name).includes(
                trimmedLowerCase(searchWord)
              ) ||
              trimmedLowerCase(product.description).includes(
                trimmedLowerCase(searchWord)
              )
          )
        )
      );
  }
}
