/*
import { inject, effect } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth/auth.service";
import { ReplaySubject, skipWhile, take, map, finalize } from "rxjs";
import { UserInterface } from "./interfaces/UserInterface";


export const canRegister: CanActivateFn = ()=> {
    console.log('guard called');
    const authService = inject(AuthService);
    const loggedIn = computed<boolean>(() => {
      const result = authService.currentUserSig()?.token;
      console.log('In computed: '+ result);
      return result === null;
    });
  
    if (loggedIn()) {
      return false;
    } else {
      return true;
    }
  };
*/

/*
export const CanRegister: CanActivateFn = () => {

  const authService = inject(AuthService);

  const authStatus = new ReplaySubject<boolean | null | UserInterface | undefined>(1);

  const watcher = effect(() => authStatus.next(authService.signedIn()));

  // this doesn't return anything ?  // have to implement guard in other way and not use a CanActivateFn
  return authStatus.pipe(
    skipWhile(status => status == null),
    take(1),
    map(authenticated => { 
      console.log('authenticated', authenticated)
      console.log('condition', authenticated === false ? true : false)
      return authenticated === false ? true : false
    }),
    finalize(watcher.destroy),
  );

}
*/

import { toObservable } from '@angular/core/rxjs-interop';
import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

let isLoggedIn$: any;

console.log('isLoggedIn$',isLoggedIn$)

export const CanRegister: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (!isLoggedIn$) {
    const isLoggedIn = computed(() => {
      console.log('The computed value has been read!', authService.signedIn());
      return authService.signedIn();
    });
    isLoggedIn$ = toObservable(isLoggedIn);
  }
  

  // The reason to use a computed value is so
  // the readings can be logged in the console.
  return isLoggedIn$;
};

