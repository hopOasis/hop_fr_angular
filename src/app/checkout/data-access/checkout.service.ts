import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryDataReq } from '../interfaces/delivery.interface';
import { environment } from '../../environments/environment';

Injectable();
export class CheckoutService {
  private httpClient = inject(HttpClient);
  private _url = environment.apiUrl;

  makeOrder(data: DeliveryDataReq) {
    this.httpClient
      .post(`${this._url}/orders`, data)
      .subscribe((res) => console.log(res));
  }
}
