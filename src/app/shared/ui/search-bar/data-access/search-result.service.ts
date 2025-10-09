import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FetchedProductData } from '../../../../catalog/data-access/models/product-api-response.model';
import { map, Observable } from 'rxjs';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';

Injectable();
export class SearchResultService {
  private httpClient = inject(HttpClient);
  private readonly URL = environment.apiUrl;

  getAllProducts(searchWord: string): Observable<ProductDescription[]> {
    return this.httpClient
      .get<FetchedProductData>(`${this.URL}/all-products?size=100`)
      .pipe(
        map((products) =>
          products.content.filter((product) =>
            searchWord.length >= 3
              ? product.name
                  ?.toLocaleLowerCase()
                  .includes(searchWord.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(searchWord.toLowerCase())
              : ''
          )
        )
      );
  }
}
