import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { tokenReducer } from './core/data-access/state/store/token/token.reducer';
import { authReducer } from './core/data-access/state/store/auth/auth.reducer';
import { authModalReducer } from './core/data-access/state/store/auth-modal/auth-modal.reducer';

import { TokenEffects } from './core/data-access/state/store/token/token.effects';
import { AuthModalEffects } from './core/data-access/state/store/auth-modal/auth-modal.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { cartReducer } from './core/data-access/state/store/cart/cart.reducer';
import { UserEffects } from './core/data-access/state/store/user/user.effects';
import { loggingInterceptor } from './core/interceptors/token.interceptor';
import { userReducer } from './core/data-access/state/store/user/user.reducer';
import { CartEffects } from './core/data-access/state/store/cart/cart.effects';
import { cartModalReducer } from './core/data-access/state/store/cart-modal/cart-modal.reducer';
import { CartModalEffects } from './core/data-access/state/store/cart-modal/cart-modal.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([loggingInterceptor])),
    provideEffects([TokenEffects, AuthModalEffects, UserEffects, CartEffects,CartModalEffects]),
    provideStore({
      token: tokenReducer,
      auth: authReducer,
      authModal: authModalReducer,
      cart: cartReducer,
      user: userReducer,
      cartModal: cartModalReducer,
    }),
  ],
};
