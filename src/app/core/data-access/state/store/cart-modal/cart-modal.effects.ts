import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';
import { cartModalState } from './cart-modal.actions';

export class CartModalEffects {
  private actions$ = inject(Actions);
  manageScrollEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cartModalState),
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
