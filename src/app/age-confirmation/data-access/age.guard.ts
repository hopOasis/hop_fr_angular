import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Is18ConfirmedService } from './is-18-confirmed.service';

export const ageGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const is18Confirmed = inject(Is18ConfirmedService).canActivate;
  if (is18Confirmed) return is18Confirmed;
  return inject(Router).createUrlTree(['/confirmage']);
};
