import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroSectionComponent } from '../../ui/hero-section/hero-section.component';
import { FAQSectionComponent } from '../../ui/faq-section/faq-section.component';
import { InfoSectionComponent } from '../../ui/info-section/info-section.component';
import { PopularProductsSectionComponent } from '../../ui/popular-products-section/popular-products-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    FAQSectionComponent,
    PopularProductsSectionComponent,
    InfoSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
