import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateToken } from './token.actions';
import { tap } from 'rxjs';
import { TokenService } from '../../../auth/services/token.service';
import { Store } from '@ngrx/store';
import { StoreData } from '../../models/store.model';
import { authState } from '../auth/auth.actions';

export class TokenEffects {
  private actions$ = inject<Actions>(Actions);
  private store = inject<Store<StoreData>>(Store);
  private tokenService = inject(TokenService);
  updateToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateToken),
        tap(({ token }) => {
          this.tokenService.setToken(token);
          this.store.dispatch(authState({ isAuth: !!token.access_token }));
        })
      ),
    {
      dispatch: false,
    }
  );
}
