import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDescription } from './models/pageable.model';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    ProductCardComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  myProduct!: ProductDescription;
}
