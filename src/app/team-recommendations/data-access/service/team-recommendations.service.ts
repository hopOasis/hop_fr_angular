import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Recommendation } from '../models/team-recommendation.model';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeamRecommendationsService {
  private httpClient = inject(HttpClient);

  getRecommendations(): Observable<Recommendation[]> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/team-recommendations`)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          console.error('Помилка завантаження рекомендацій:', error);
          return of([]);
        }),
        map((res) => {
          if (res?.errors?.ResourceNotFoundException) {
            return [];
          }
          return res as Recommendation[];
        })
      );
  }
}
