import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.scss'],
})
export class RecommendationCardComponent {
  @Input() photo!: string;
  @Input() name!: string;
  @Input() position!: string;
  @Input() comment!: string;
  @Input() productLink!: string;

  @HostBinding('class') hostClass = 'card';
}
