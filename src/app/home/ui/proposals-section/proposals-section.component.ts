import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { proposalsData } from '../../data-access/constants/proposals';

@Component({
  selector: 'app-proposals-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proposals-section.component.html',
  styleUrl: './proposals-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalsSectionComponent {
  proposals = [...proposalsData];
}
