import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recommendation {
  name: string;
  position: string;
  photoUrl: string;
  text: string;
  productUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiUrl = 'https://hopoasis.onrender.com/team-recommendations';

  constructor(private http: HttpClient) {}

  getRecommendations(): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(this.apiUrl);
  }
}
