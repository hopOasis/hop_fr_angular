import { Component, inject, input } from '@angular/core';

import { SearchResult } from '../../../../interfaces/search-result.interface';
import { UpdateMeasurePipe } from '../../../../../catalog/utils/update-measure.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-drop-down',
  standalone: true,
  imports: [UpdateMeasurePipe, RouterLink],
  templateUrl: './search-drop-down.component.html',
  styleUrl: './search-drop-down.component.scss',
})
export class SearchDropDownComponent {
  searchResult = input<SearchResult | undefined>();
  private router = inject(Router);

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
