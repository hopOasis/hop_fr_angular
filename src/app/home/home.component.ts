import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamRecommendationsSectionComponent } from '../team-recommendations/feature/team-recommendations/team-recommendations-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamRecommendationsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
