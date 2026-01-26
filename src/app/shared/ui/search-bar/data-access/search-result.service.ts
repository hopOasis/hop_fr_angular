import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FetchedProductData } from '../../../../catalog/data-access/models/product-api-response.model';
import { environment } from '../../../../environments/environment';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';
import { trimmedLowerCase } from './trimmedLower';

@Injectable({ providedIn: 'root' })
export class SearchResultService {
  private httpClient = inject(HttpClient);
  private readonly URL = environment.apiUrl;
  private readonly _elementsOnPage = 1000;

  getAllProducts(searchWord: string): Observable<ProductDescription[]> {
    if (searchWord.length < 3) {
      return this.httpClient
        .get<FetchedProductData>(
          `${this.URL}/all-products?size=${this._elementsOnPage}`
        )
        .pipe(map(() => []));
    }
    return this.httpClient
      .get<FetchedProductData>(
        `${this.URL}/all-products?size=${this._elementsOnPage}`
      )
      .pipe(
        map((products) => {
          return products.content.filter((product) => {
            if (product.imageName?.length && product.imageName.length > 1)
              product.imageName?.splice(0, 1);
            return (
              trimmedLowerCase(product.name).includes(
                trimmedLowerCase(searchWord)
              ) ||
              trimmedLowerCase(product.description).includes(
                trimmedLowerCase(searchWord)
              )
            );
          });
        })
      );
  }
}
