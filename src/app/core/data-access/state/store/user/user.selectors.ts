import { UserInfo } from '../../../user/models/user-info.model';

export const selectFirstName = (state: {
  user: { userInfo: null | UserInfo };
}) => {
  if (state.user.userInfo) return state.user.userInfo.firstName;
  return '';
};
