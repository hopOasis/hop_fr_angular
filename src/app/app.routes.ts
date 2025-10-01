import { Routes } from '@angular/router';
import { shopRoutes } from './catalog/feature/product.routes';
import { checkUserPermission } from './authentication/data-access/guards/auth.guard';
import { userCabinetRoutes } from './user/feature/user-cabinet.routes';
<<<<<<< HEAD
import { ageGuard } from './age-confirmation/data-access/age.guard';
=======
>>>>>>> 6bc1499 (cart functionality)

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [ageGuard],
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },

  { path: 'shop', canActivate: [ageGuard], children: shopRoutes },
  {
    path: 'my_cabinet',
    canMatch: [checkUserPermission],
    canActivate: [ageGuard],
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
  {
    path: 'confirmage',
    loadComponent: () =>
      import(
        './age-confirmation/feauters/confirmation/age-confirmation.component'
      ).then((c) => c.AgeConfirmationComponent),
  },
];
