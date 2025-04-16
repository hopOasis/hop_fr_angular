import { Routes } from '@angular/router';
import { shopRoutes } from './catalog/feature/product.routes';
import { checkUserPermission } from './authentication/data-access/guards/auth.guard';
import { userCabinetRoutes } from './user/feature/user-cabinet.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/feature/home/home.component').then((m) => m.HomeComponent),
  },

  { path: 'shop', children: shopRoutes },
  {
    path: 'my_cabinet',
    canMatch: [checkUserPermission],
    children: userCabinetRoutes,
    loadComponent: () =>
      import('./user/feature/my-cabinet/my-cabinet.component').then(
        (m) => m.MyCabinetComponent
      ),
  },
  {
    path: 'not_found',
    loadComponent: () =>
      import('./shared/layout/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
