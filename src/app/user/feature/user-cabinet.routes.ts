import { Routes } from '@angular/router';

export const userCabinetRoutes: Routes = [
  { path: '', redirectTo: 'my-orders', pathMatch: 'full' },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('../../order/feature/my-orders/my-orders.component').then(
        (m) => m.MyOrdersComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../../cart/feature/cart/cart.component').then(
        (m) => m.CartComponent
      ),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('../../wishlist/feature/favorite/favorite.component').then((m) => m.FavoriteComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
];
