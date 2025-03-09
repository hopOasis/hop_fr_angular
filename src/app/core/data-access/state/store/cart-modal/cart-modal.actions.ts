import { createAction, props } from '@ngrx/store';

export const cartModalState = createAction(
  '[Cart modal] change state',
  props<{ isOpened: boolean }>()
);
