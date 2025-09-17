import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeItemComponent } from './home-item/home-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
