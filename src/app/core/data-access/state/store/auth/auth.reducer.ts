import { createReducer, on } from '@ngrx/store';
import { authState } from './auth.actions';

const initialState = { isAuth: false };
export const authReducer = createReducer(
  initialState,
  on(authState, (state, actions) => actions)
);
