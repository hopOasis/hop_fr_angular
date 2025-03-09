import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreData } from '../data-access/state/models/store.model';
export const checkUserPermission: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const store = inject<Store<StoreData>>(Store);
  return store.select('auth').pipe(
    take(1),
    map((isAuth) => {
      if (!isAuth) return router.createUrlTree(['/home']);
      return true;
    })
  );
};
