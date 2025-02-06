import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TypesOfSorting } from '../../../models/products-types.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
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
  public currentChild = signal<string | undefined>('all-products');
  ngOnInit(): void {
    const routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.currentChild.set(this.activeRoute.children[0].routeConfig?.path);
    });

    this.destroyRef.onDestroy(() => routerEventSubscription.unsubscribe());
  }
  onChangeType(type: TypesOfSorting) {
    this.currentChild.set(this.activeRoute.children[0].routeConfig?.path);
    this.currentTypeOfSorting.set(type);
    this.router.navigate(['./', this.currentChild()], {
      queryParams: { sort_by: this.currentTypeOfSorting() },
      relativeTo: this.activeRoute,
    });
  }
}
