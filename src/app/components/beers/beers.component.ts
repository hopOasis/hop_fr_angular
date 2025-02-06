import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beers',
  standalone: true,
  imports: [],
  templateUrl: './beers.component.html',
  styleUrl: './beers.component.scss',
})
export class BeersComponent implements OnInit {
  private productService = inject(ProductsService);
  private typeOfSorting$ = this.productService.typeOfSorting$;
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    const dataSubscription = this.productService
      .getBeersData()
      .subscribe((data) => {
        console.log(data);
      });
    const paramsSubscription = this.activeRoute.queryParams.subscribe(
      ({ sort_by }) => {
        this.typeOfSorting$.next(sort_by);
      }
    );
    this.destroyRef.onDestroy(() => {
      paramsSubscription.unsubscribe();
      dataSubscription.unsubscribe();
    });
  }
}
