import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Offer } from '../models/offer.interface';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';

@Injectable()
export class ActiveOffersService {
  private httpClient = inject(HttpClient);
  private readonly url = environment.apiUrl;
  /*
  // @dev testing purpose
  getActiveOffers(prodName: string): Observable<ProductDescription[] | null> {
    return this.httpClient.get<FetchedProductData>(`${this.url}/beers`).pipe(
      map((item) => item.content),
      catchError((err: HttpErrorResponse) => {
        throw `Error in active offers on product name: ${prodName}. Details: ${err.message}`;
      })
    );
  }

  */

  getActiveOffers(prodName: string): Observable<ProductDescription[] | null> {
    return this.httpClient.get<Offer[]>(`${this.url}/special-offers`).pipe(
      map((item) => {
        const offers: ProductDescription[] = [];
        item.forEach((prod) => {
          if (
            prod.active &&
            prod.name.toLowerCase().trim() === prodName.toLowerCase().trim()
          ) {
            offers.push(...prod.specialOfferBeers);
            offers.push(...prod.specialOfferCiders);
            offers.push(...prod.specialOfferProductBundles);
            offers.push(...prod.specialOfferSnacks);
          }
        });

        return offers;
      }),
      catchError((err) => {
        throw `Error in active offers on product name: ${prodName}. Details: ${err}`;
      })
    );
  }
}
