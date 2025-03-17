import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';

import { AuthApiService } from '../api/auth-api.service';

export const checkUserPermission: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authApiService = inject(AuthApiService);
  return of(authApiService.isAuth()).pipe(
    take(1),
    map((isAuth) => {
      if (!isAuth) return router.createUrlTree(['/home']);
      return true;
    })
  );
};
