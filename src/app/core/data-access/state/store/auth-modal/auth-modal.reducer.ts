import { createReducer, on } from '@ngrx/store';
import { authModal } from './auth-modal.actions';

const initialState = { isOpened: false };

export const authModalReducer = createReducer(
  initialState,
  on(authModal, (state, actions) => actions)
);
