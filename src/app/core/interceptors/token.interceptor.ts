import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs';
import { StoreData } from '../data-access/state/models/store.model';

export const loggingInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const injector = inject(Injector);
  const store = injector.get<Store<StoreData>>(Store);
  return store.select('token').pipe(
    take(1),
    switchMap((token) => {
      if (token.access_token) {
        const newReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${token.access_token}`
          ),
        });
        return next(newReq);
      } else return next(req);
    })
  );
};
