import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { proposalsData } from '../../data-access/constants/proposals';

@Component({
  selector: 'app-proposals-section',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './proposals-section.component.html',
  styleUrl: './proposals-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalsSectionComponent {
  proposals = [...proposalsData];

  getGridClasses(index: number): string {
    if (index === 0 || index === 1) {
      return 'lg:col-span-2 lg:row-span-2 sm:flex-row';
    } else if (index === 2) {
      return 'lg:row-span-4 h-full sm:flex-row lg:flex-col';
    }
    return '';
  }
}
