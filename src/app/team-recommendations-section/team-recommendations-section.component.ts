import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRecsService, Recommendation } from './team-recs.service';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';
import { finalize, catchError, of } from 'rxjs';

@Component({
  selector: 'app-team-recommendations-section',
  standalone: true,
  imports: [CommonModule, RecommendationCardComponent],
  templateUrl: './team-recommendations-section.component.html',
  styleUrls: ['./team-recommendations-section.component.scss'],
})
export class TeamRecommendationsSectionComponent implements OnInit {
  recommendations: Recommendation[] = [];
  loading = true;
  error = false;

  constructor(private teamRecsService: TeamRecsService) {}

  ngOnInit() {
    this.loadRecommendations();
  }

  private loadRecommendations(): void {
    this.loading = true;
    this.error = false;

    this.teamRecsService
      .getRecommendations()
      .pipe(
        finalize(() => (this.loading = false)),
        catchError((err) => {
          console.error('Error loading recommendations:', err);
          this.error = true;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.recommendations = data;
      });
  }
}
