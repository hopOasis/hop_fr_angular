import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../../data-access/store/catalog.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  readonly catalogStore = inject(CatalogStore);
  public currentPage = this.catalogStore.page;
  public availablePages = input.required<number>();
  public arrayOfPages = computed<number[]>(() => this.calculatePagination());
  onChangePage(page: number) {
    this.catalogStore.updateInfo({ page: page });
    this.viewportScroller.scrollToPosition([0, 0]);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }
  calculatePagination() {
    let arr = [];
    let counter = 5;
    if (this.availablePages() <= 5 || this.currentPage() <= 2) {
      for (let i = 1; i <= this.availablePages() && counter; i++) {
        arr.push(i);
        counter--;
      }
      return arr;
    }

    for (let i = this.currentPage() + 1; i <= this.currentPage() + 3; i++) {
      if (i <= this.availablePages()) {
        arr.push(i);
        counter--;
      }
    }
    for (let i = this.currentPage(); i > 0; i--) {
      if (counter) {
        arr.push(i);
        counter--;
      }
    }
    arr = arr.sort((a, b) => a - b);
    return arr;
  }
}
