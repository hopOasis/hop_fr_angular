import { Routes } from '@angular/router';
import { ShopComponent } from './components/pages/shop/shop.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { BeersComponent } from './components/beers/beers.component';
import { CidersComponent } from './components/ciders/ciders.component';
import { SnacksComponent } from './components/snacks/snacks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      {
        path: 'beers',
        component: BeersComponent,
      },
      {
        path: 'ciders',
        component: CidersComponent,
      },
      {
        path: 'snacks',
        component: SnacksComponent,
      },
      {
        path: '',
        redirectTo: 'all-products',
        pathMatch: 'full',
      },
    ],
  },
];
