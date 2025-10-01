import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.prod';
=======
import { environment } from '../../../../environments/environment.prod';
>>>>>>> ee1d40f (fix-deploy-bag)

@Injectable({ providedIn: 'root' })
export class UserService {
  private httpClient = inject(HttpClient);
  getUserInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${environment.apiUrl}/profile`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => 'Не отримав інформацію юзера');
      })
    );
  }
}
