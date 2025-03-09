import { Routes } from '@angular/router';

export const userCabinetRoutes: Routes = [
  { path: '', redirectTo: 'my-orders', pathMatch: 'full' },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('./my-orders/my-orders.component').then(
        (m) => m.MyOrdersComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./favorite/favorite.component').then((m) => m.FavoriteComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
];
