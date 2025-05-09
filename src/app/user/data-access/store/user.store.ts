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
const initialState: UserStoreData = {
  userInfo: null,
  loading: false,
};
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ userInfo, loading }) => ({
    isLoading: computed(() => loading),
    userName: computed(() => (userInfo ? userInfo()!.firstName : '')),
  })),
  withMethods((store, userService = inject(UserService)) => ({
    updateUserInfo: rxMethod<boolean>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((state) =>
          combineLatest([userService.getUserInfo(), of(state)])
        )
      )
    ),
  }))
);
