import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, switchMap, take } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
export const loggingInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authApiService = inject(AuthApiService);
  return of(authApiService.accessToken()).pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        const newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(newReq);
      } else return next(req);
    })
  );
};
