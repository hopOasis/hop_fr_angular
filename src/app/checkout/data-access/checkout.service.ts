import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryDataReq } from '../interfaces/delivery.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

Injectable();
export class CheckoutService {
  private httpClient = inject(HttpClient);
  private _url = environment.apiUrl;

  makeOrder(data: DeliveryDataReq): Observable<any> {
    return this.httpClient.post(`${this._url}/orders`, data);
  }
}
