import { Routes } from '@angular/router';

export const userCabinetRoutes: Routes = [
  { path: '', redirectTo: 'my-orders', pathMatch: 'full' },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('../../order/feature/order-page/order-page.component').then(
        (m) => m.OrderPageComponent
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
      import('../../wishlist/feature/favorite/favorite.component').then(
        (m) => m.FavoriteComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
];
