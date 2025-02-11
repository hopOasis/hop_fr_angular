import { createAction } from '@ngrx/store';

export const showLoginModal = createAction('[loginModal] show');
export const hideLoginModal = createAction('[loginModal] hide');

export const showRegisterModal = createAction('[registerModal] show');
export const hideRegisterModal = createAction('[registerModal] hide');
