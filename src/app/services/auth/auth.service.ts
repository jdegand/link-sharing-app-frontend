import { Injectable, signal } from "@angular/core";
import { AuthResponse } from "../../interfaces/AuthResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // public vs private
  // behaviourSubject is viable alternative
  // allow currentUserSig to be null ?
  currentUserSig = signal<AuthResponse | undefined>(undefined);

  constructor() {
    // make functions to get the tokens ?
    const accessToken = this.getAccessTokenFromLocalStorage();
    const refreshToken = this.getRefreshTokenFromLocalStorage();

    if (accessToken) {
      // send another api request to validate token sub is in database?
      // const decoded = jwtDecoderService.decodeToken(localStorageToken);
      // console.log('decoded', decoded);
      this.currentUserSig.set({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  }

  getAccessTokenFromLocalStorage() {
    return localStorage.getItem("token") ?? "";
  }

  getRefreshTokenFromLocalStorage() {
    return localStorage.getItem("refresh-token") ?? "";
  }

  notSignedIn() {
    const signal = this.currentUserSig();
    return signal === undefined ? true : false;
  }
}
