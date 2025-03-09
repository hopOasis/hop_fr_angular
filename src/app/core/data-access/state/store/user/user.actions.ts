import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../../../user/models/user-info.model';

export const updateUserInfo = createAction(
  '[User info] update',
  props<{ userInfo: UserInfo | null }>()
);
