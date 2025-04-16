import { ChangeDetectionStrategy, Component } from '@angular/core';

import { infoData } from '../../data-access/constants/info';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSectionComponent {
  info = infoData;
}
