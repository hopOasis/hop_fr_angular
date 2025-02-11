import { createReducer, on } from '@ngrx/store';

import { logIn, logOut } from './auth.actions';

const initialState = false;
export const authReducer = createReducer(
  initialState,
  on(logIn, () => true),
  on(logOut, () => false)
);
