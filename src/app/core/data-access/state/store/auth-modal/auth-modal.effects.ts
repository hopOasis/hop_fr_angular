import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authModal } from './auth-modal.actions';
import { tap } from 'rxjs';

export class AuthModalEffects {
  private actions$ = inject(Actions);
  manageScrollEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authModal),
        tap(({ isOpened }) => {
          if (isOpened) document.body.style.overflow = 'hidden';
          else document.body.style.overflow = 'scroll';
        })
      ),
    {
      dispatch: false,
    }
  );
}
