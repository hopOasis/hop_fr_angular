import { withMethods, withState } from '@ngrx/signals';
import { patchState, signalStore } from '@ngrx/signals';
import { TokenStore } from '../models/token.model';
import { inject } from '@angular/core';
import { UserApiService } from '../../../user/data-access/api/user-api.service';
const initialState: TokenStore = {
  access_token: '',
  isAuth: false,
};
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userApiService = inject(UserApiService)) => ({
    updateToken(token: string) {
      patchState(store, () => ({
        access_token: token,
        isAuth: token ? true : false,
      }));
      if (token) userApiService.fetchUserInfo(store.isAuth());
    },
  }))
);
