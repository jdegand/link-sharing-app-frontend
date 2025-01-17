import { toObservable } from "@angular/core/rxjs-interop";
import { computed, inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth/auth.service";
import { Observable } from "rxjs";

// guard is taken from https://github.com/angular/angular/issues/51280

let isLoggedIn$: Observable<boolean>;

export const CanRegister: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (!isLoggedIn$) {
    const isLoggedIn = computed(() => {
      return authService.notSignedIn();
    });
    isLoggedIn$ = toObservable(isLoggedIn);
  }

  return isLoggedIn$;
};
