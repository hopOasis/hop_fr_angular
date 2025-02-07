import { Component, input } from '@angular/core';
import { ProductDescription } from '../../models/pageable.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  public data = input.required<ProductDescription>();
}
