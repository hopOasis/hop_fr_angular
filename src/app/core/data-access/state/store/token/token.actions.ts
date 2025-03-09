import { createAction, props } from '@ngrx/store';
import { Token } from '../../../auth/models/token.model';

export const updateToken = createAction(
  '[Manage token] update token',
  props<{ token: Token }>()
);
