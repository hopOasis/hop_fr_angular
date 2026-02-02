import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Recommendation } from '../models/team-recommendation.model';

@Injectable({ providedIn: 'root' })
export class TeamRecommendationsService {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getRecommendations(): Observable<Recommendation[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return this.httpClient
      .get<Recommendation[]>(`${environment.apiUrl}/team-recommendations`)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading recommendations:', error);
          if (error.status === 404) return of([]);
          return throwError(() => error);
        }),
        map((res) => (Array.isArray(res) ? res : [])),
      );
  }
}
