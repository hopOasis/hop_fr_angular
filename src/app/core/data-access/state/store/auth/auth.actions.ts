import { createAction, props } from '@ngrx/store';

export const authState = createAction(
  '[Auth state] change state',
  props<{isAuth:boolean}>()
);
