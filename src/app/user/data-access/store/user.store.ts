import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserStoreData } from '../models/user-store.model';
import { computed, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { combineLatest, of, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';
const initialState: UserStoreData = {
  userInfo: null,
  loading: false,
};
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ userInfo, loading }) => ({
    isLoading: computed(() => loading),
    userName: computed(() => (userInfo ? userInfo()?.firstName : '')),
    userData: computed(() => userInfo()),
  })),
  withMethods(
    (
      store,
      userService = inject(UserService),
      cartApi = inject(CartApiService),
    ) => ({
      updateUserInfo: rxMethod<boolean>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((state) =>
            combineLatest([userService.getUserInfo(), of(state)]),
          ),
          tapResponse({
            next: ([userInfo, state]) => {
              (patchState(store, { loading: false, userInfo }),
                cartApi.triggerCartUpdate(state));
            },
            error: () => {
              patchState(store, { loading: false, userInfo: null });
              cartApi.triggerCartUpdate(false);
              console.error('Не вдалось завантажити інформацію користувача');
            },
          }),
        ),
      ),
    }),
  ),
);
