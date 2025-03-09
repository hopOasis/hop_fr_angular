import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateUserInfo } from './user.actions';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreData } from '../../models/store.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../user/services/user.service';
import { UserInfo } from '../../../user/models/user-info.model';
import { updateToken } from '../token/token.actions';
import { triggerCartApdating } from '../cart/cart.actions';

Injectable();
export class UserEffects {
  private actions$ = inject<Actions>(Actions);
  private store = inject<Store<StoreData>>(Store);
  private userService = inject(UserService);
  userInfo = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateToken),
        switchMap(({ token }) => {
          if (token.access_token)
            return this.userService.getUserInfo().pipe(
              tap((userInfo) => this.makeDispatch(userInfo)),
              catchError((error: HttpErrorResponse) => {
                this.makeDispatch(null);
                this.store.dispatch(
                  updateToken({ token: { access_token: '' } })
                );
                return throwError(() => error.statusText);
              })
            );
          else {
            this.makeDispatch(null);
            return of(null);
          }
        })
      ),
    { dispatch: false }
  );
  makeDispatch(userInfo: UserInfo | null) {
    this.store.dispatch(triggerCartApdating());
    this.store.dispatch(updateUserInfo({ userInfo: userInfo }));
  }
}
