import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ShopComponent } from './components/pages/shop/shop.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserCabinetComponent } from './components/pages/user-cabinet/user-cabinet.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ScrollService } from './services/scroll.service';
import { Store } from '@ngrx/store';
import { StoreData } from './models/store.model';

const checkUserPermission: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const scrollService = inject(ScrollService);
  const store = inject<Store<StoreData>>(Store);
  const router = inject(Router);

  if (!authService.token)
    authService.refreshAccessToken().subscribe({
      next: (token) => {},
      error: () => router.navigate(['/home']),
    });
  return true;
};
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop/:typeCategory',
    component: ShopComponent,
  },
  { path: 'shop', redirectTo: 'shop/all-products', pathMatch: 'full' },
  {
    path: 'my_cabinet',
    component: UserCabinetComponent,
    canMatch: [checkUserPermission],
  },
  { path: 'not_found', component: NotFoundComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
