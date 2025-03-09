export const selectAuthState = (state: { auth: { isAuth: boolean } }) =>
  state.auth.isAuth;
