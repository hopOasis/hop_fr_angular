import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UpdateMeasurePipe } from '../../../../../catalog/utils/update-measure.pipe';
import { ProductDescription } from '../../../../../catalog/data-access/models/product-description.model';

@Component({
  selector: 'app-search-drop-down',
  standalone: true,
  imports: [UpdateMeasurePipe, RouterLink],
  templateUrl: './search-drop-down.component.html',
  styleUrl: './search-drop-down.component.scss',
})
export class SearchDropDownComponent {
  searchResult = input<ProductDescription | null>();
  private router = inject(Router);

  get price(): number {
    return this.searchResult()?.options[0]?.price ?? 0;
  }

  /**
   * @param id should be changed to product.item.id in store
   * @param type type of product
   * @dev for correct work should be fixed product details component
   */
  redirect(id: number | string, type: string) {
    this.router.navigate(['/shop/details', id], {
      queryParams: { type: type.toUpperCase() },
    });
  }
}
