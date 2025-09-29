import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRecsService, Recommendation } from './team-recs.service';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';

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
    this.teamRecsService.getRecommendations().subscribe({
      next: (data) => {
        this.recommendations = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
