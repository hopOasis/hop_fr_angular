import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { BeerDescription } from '../../models/pageable.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-beers',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './beers.component.html',
  styleUrl: './beers.component.scss',
})
export class BeersComponent implements OnInit {
  private productService = inject(ProductsService);
  private typeOfSorting$ = this.productService.typeOfSorting$;
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  public productsData = signal<undefined | BeerDescription[]>(undefined);
  ngOnInit(): void {
    const dataSubscription = this.productService
      .getBeersData()
      .subscribe((data) => {
        this.productsData.set(data.content);
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
