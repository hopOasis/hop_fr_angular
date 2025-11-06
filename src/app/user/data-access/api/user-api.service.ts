import { inject, Injectable, Signal } from '@angular/core';
import { UserStore } from '../store/user.store';
import { UserInfo } from '../models/user-info.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  readonly userStore = inject(UserStore);
  fetchUserInfo(state:boolean): void {
    this.userStore.updateUserInfo(state);
  }
  get userInfo(): Signal<UserInfo | null> {
    return this.userStore.userInfo;
  }
  get userFirstName(): Signal<string> {
    return this.userStore.userName;
  }
}
