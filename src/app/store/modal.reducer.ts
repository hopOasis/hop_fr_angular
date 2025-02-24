import { createReducer, on } from '@ngrx/store';
import {
  showLoginModal,
  hideLoginModal,
  showRegisterModal,
  hideRegisterModal,
} from './modal.actions';

export const loginInitialState = false;
export const loginModalReducer = createReducer(
  loginInitialState,
  on(showLoginModal, () => true),
  on(hideLoginModal, () => false)
);

export const registerInitialState = false;
export const registerModalReducer = createReducer(
  registerInitialState,
  on(showRegisterModal, () => true),
  on(hideRegisterModal, () => false)
);
