import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRecommendationsService } from '../../data-access/service/team-recommendations.service';
import { Recommendation } from '../../data-access/models/team-recommendation.model';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-team-recommendations-section',
  standalone: true,
  imports: [CommonModule, RecommendationCardComponent],
  templateUrl: './team-recommendations-section.component.html',
  styleUrls: ['./team-recommendations-section.component.scss'],
})
export class TeamRecommendationsSectionComponent implements OnInit, OnDestroy {
  recommendations: Recommendation[] = [];
  loading = true;
  error = false;

  private destroy$ = new Subject<void>();

  constructor(private teamRecsService: TeamRecommendationsService) {}

  ngOnInit() {
    this.loadRecommendations();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRecommendations(): void {
    this.loading = true;
    this.error = false;

    this.teamRecsService
      .getRecommendations()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          if (
            err.status === 400 &&
            err.error?.errors?.ResourceNotFoundException ===
              'There are no recommendations'
          ) {
            this.recommendations = [];
            this.error = false;
          } else {
            console.error('Error loading recommendations:', err);
            this.error = true;
          }
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((data: Recommendation[]) => {
        this.recommendations = Array.isArray(data) ? data : [];
      });
  }
}
