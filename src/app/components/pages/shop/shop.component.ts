import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
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
})
export class ShopComponent implements OnInit {
  private typesOfSorting = signal(['asc', 'desc']);
  public currentTypeOfSorting = signal<TypesOfSorting | ''>('asc');
  public isActiveSortButtons = signal(true);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  public currentChild: string | undefined;
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(({ sort_by }) => {
      this.currentChild = this.activeRoute.children[0].routeConfig?.path;
    });
  }
  onChangeType(type: TypesOfSorting) {
    this.currentTypeOfSorting.set(type);
  }
}
