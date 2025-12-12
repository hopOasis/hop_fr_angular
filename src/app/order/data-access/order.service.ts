import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderRes } from '../interfaces/order.interface';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httlClient = inject(HttpClient);
  private readonly URL = environment.apiUrl;

  getOrder(): Observable<OrderRes[]> {
    return this.httlClient.get<OrderRes[]>(`${this.URL}/orders/user`).pipe(
      catchError((err: HttpErrorResponse) => {
        throw `Error in user order on product name. Details: ${err.message}`;
      })
    );
  }
}
