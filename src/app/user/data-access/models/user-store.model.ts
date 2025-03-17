import { UserInfo } from './user-info.model';

export interface UserStoreData {
  userInfo: UserInfo | null;
  loading: boolean;
}
