import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Page1Component } from './page-1/features/page-1.component';
import { HomeItemComponent } from './home-item/home-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Page1Component, HomeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
