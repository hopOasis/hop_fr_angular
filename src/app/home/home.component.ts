import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Page1Component } from './page-1/features/page-1.component';
import { HomeItemComponent } from './home-item/home-item.component';
import { Page2Component } from './page-2/page-2.component';
import { TeamRecommendationsSectionComponent } from '../team-recomendations/feature/team-recommendations/team-recommendations-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Page1Component,
    HomeItemComponent,
    Page2Component,
    TeamRecommendationsSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
