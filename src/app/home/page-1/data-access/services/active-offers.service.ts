import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Offer } from '../models/offer.interface';
import { ProductDescription } from '../../../../catalog/data-access/models/product-description.model';

@Injectable()
export class ActiveOffersService {
  private httpClient = inject(HttpClient);
  private readonly url = environment.apiUrl;

  getActiveOffers(): Observable<ProductDescription[] | null> {
    return this.httpClient.get<Offer[]>(`${this.url}/special-offers`).pipe(
      map((item) => {
        const products: ProductDescription[] = [];
        item.forEach((prod) => {
          if (prod.active) {
            products.push(...prod.specialOfferBeers);
            products.push(...prod.specialOfferCiders);
            products.push(...prod.specialOfferProductBundles);
            products.push(...prod.specialOfferSnacks);
          }
        });

        return products;
      })
    );
  }
}
