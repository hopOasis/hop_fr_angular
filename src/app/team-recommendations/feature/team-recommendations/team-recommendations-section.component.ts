import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  constructor(
    private teamRecsService: TeamRecommendationsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadRecommendations();
    } else {
      this.loading = false;
      this.recommendations = [];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  checkedOnce = false;

  private loadRecommendations(): void {
    this.loading = true;
    this.error = false;
    this.checkedOnce = false;

    this.teamRecsService
      .getRecommendations()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.error('Error loading recommendations:', err);
          if (err.status === 404) {
            this.recommendations = [];
            this.error = false;
          } else {
            this.error = true;
          }
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
          this.checkedOnce = true;
        })
      )
      .subscribe((data: Recommendation[]) => {
        this.recommendations = Array.isArray(data) ? data : [];
      });
  }
}
