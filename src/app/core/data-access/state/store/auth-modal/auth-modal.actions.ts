import { createAction, props } from '@ngrx/store';

export const authModal = createAction(
  '[Auth modal] modal state',
  props<{ isOpened: boolean }>()
);
