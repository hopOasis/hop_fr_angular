import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  { path: '', redirectTo: 'all-products', pathMatch: 'full' },
  {
    path: ':typeOfProduct',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'details/:productId',
    loadComponent: () =>
      import('./product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
];
