import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../../../user/models/user-info.model';
import { updateUserInfo } from './user.actions';

const initialState: { userInfo: UserInfo | null } = {
  userInfo: null,
};

export const userReducer = createReducer(
  initialState,
  on(updateUserInfo, (state, action) => {
    return { userInfo: action.userInfo };
  })
);
