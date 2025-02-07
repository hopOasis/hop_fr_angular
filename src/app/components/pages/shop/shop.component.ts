import { DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesOfSorting } from '../../../models/products-types.model';
import { ProductsService } from '../../../services/products.service';
import { ProductDescription } from '../../../models/pageable.model';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  public currentTypeOfSorting = signal<TypesOfSorting>('asc');
  public isActiveSortButtons = signal(true);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  public currentChildRoute = signal<string>('all-products');
  public productData = signal<undefined | ProductDescription[]>(undefined);
  ngOnInit(): void {
    this.currentTypeOfSorting.set(
      this.activeRoute.snapshot.queryParams['sort_by']
    );
    const fetchedDataSubscription = this.productsService
      .getProductData()
      .subscribe((data) => {
        this.productData.set(data.content);
      });
    const paramsSubscription = this.activeRoute.params.subscribe(
      ({ typeCategory }) => {
        this.productData.set([]);
        this.productsService.typeOfCategory$.next(typeCategory);
        this.currentChildRoute.set(typeCategory);
      }
    );
    const queryParamsSubscription = this.activeRoute.queryParams.subscribe(
      ({ sort_by }) => {
        this.productsService.typeOfSorting$.next(sort_by);
      }
    );
    this.destroyRef.onDestroy(() => {
      fetchedDataSubscription.unsubscribe();
      paramsSubscription.unsubscribe();
      queryParamsSubscription.unsubscribe();
    });
  }

  onChangeType(type: TypesOfSorting) {
    this.productData.set([]);
    this.currentChildRoute.set(
      this.activeRoute.snapshot.params['typeCategory']
    );
    this.currentTypeOfSorting.set(type);
    this.router.navigate(['/shop', this.currentChildRoute()], {
      queryParams: { sort_by: this.currentTypeOfSorting() },
      relativeTo: this.activeRoute,
    });
  }
}
