import { Routes } from '@angular/router';
import { ShopComponent } from './components/pages/shop/shop.component';
import { HomeComponent } from './components/pages/home/home.component';

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
];
