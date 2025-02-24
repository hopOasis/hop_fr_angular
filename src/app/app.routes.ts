import { Routes } from '@angular/router';
import { ShopComponent } from './components/pages/shop/shop.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserCabinetComponent } from './components/pages/user-cabinet/user-cabinet.component';
import { ProductComponent } from './components/pages/product/product.component';

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
  { path: 'shop', redirectTo: 'shop/beers', pathMatch: 'full' },
  {
    path: 'shop/product/:productId',
    component: ProductComponent,
  },
  {
    path: 'cabinet',
    component: UserCabinetComponent,
  },

  { path: 'not_found', component: NotFoundComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
