import { Routes } from '@angular/router';
import { shopRoutes } from './shop/feature/product.routes';
import { checkUserPermission } from './core/guards/auth.guard';
import { userCabinetRoutes } from './user-cabinet/feature/user-cabinet.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },

  { path: 'shop', children: shopRoutes },
  {
    path: 'my_cabinet',
    canMatch: [checkUserPermission],
    children: userCabinetRoutes,
    loadComponent: () =>
      import('./user-cabinet/feature/my-cabinet/my-cabinet.component').then(
        (m) => m.MyCabinetComponent
      ),
  },
];
