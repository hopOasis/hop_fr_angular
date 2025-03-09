import { createAction, props } from '@ngrx/store';
import { CartResponse } from '../../../cart/models/cart-response.model';

export const updateCart = createAction(
  '[Update cart] cart',
  props<{cartDetails:CartResponse|null}>()
);
export const triggerCartApdating = createAction('[Update cart] trigger');
