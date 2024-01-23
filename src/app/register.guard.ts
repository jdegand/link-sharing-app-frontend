import { toObservable } from '@angular/core/rxjs-interop';
import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

// This guard can work only if the register route is left in the navbar 
// and user uses that menu link to get to the route
// typing the route path and its navigation destroys the auth signal

// guard is taken from https://github.com/angular/angular/issues/51280

let isLoggedIn$: any;

export const CanRegister: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (!isLoggedIn$) {
    const isLoggedIn = computed(() => {
      console.log('The computed value has been read!', authService.notSignedIn());
      return authService.notSignedIn();
    });
    isLoggedIn$ = toObservable(isLoggedIn);
  }

  return isLoggedIn$;
};