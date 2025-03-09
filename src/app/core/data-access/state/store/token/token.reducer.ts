import { createReducer, on } from '@ngrx/store';
import { Token } from '../../../auth/models/token.model';
import { updateToken } from './token.actions';

const initialState: Token = { access_token: '' };

export const tokenReducer = createReducer(
  initialState,
  on(updateToken, (state, actions) => actions.token)
);
