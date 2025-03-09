import { ViewportScroller } from '@angular/common';
import { Component, computed, inject, input, model } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../data-access/services/shop.service';
import { FetchedProductData } from '../../../core/data-access/models/product-api-response.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  public productData = model.required<boolean>();
  private shopService = inject(ShopService);
  public currentPage = model.required<number>();
  public availablePages = input.required<number>();
  public arrayOfPages = computed<number[]>(() => this.calculatePagination());
  onChangePage(page: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.productData.set(true);
    this.shopService.pageOfProduct$.next(page);
    this.currentPage.set(page);
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
