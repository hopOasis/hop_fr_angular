import { Component, input } from '@angular/core';
import { ProductDescription } from '../../models/pageable.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public data = input.required<ProductDescription>();
  myProduct: any = {
    id: 1,
    image: 'product-cards/01.png',
    title: 'Пиво темне з фруктовими нотками English IPA, 6%',
    volumes1: 0.33,
    volumes2: 0.5,
    price: 70,
    stock: true, // true - в наявності, false - немає
  };
}
