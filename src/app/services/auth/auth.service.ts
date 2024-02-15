import { Injectable, signal } from '@angular/core';
import { JwtDecoderService } from '../jwt/jwt-decoder.service';
import { AuthResponse } from '../../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public vs private 
  // behaviourSubject is viable alternative
  // allow currentUserSig to be null ? 
  currentUserSig = signal<AuthResponse | undefined>(undefined);

  constructor(private jwtDecoderService: JwtDecoderService) {
    const localStorageToken = localStorage.getItem('token') ?? "";
    const refreshStorageToken = localStorage.getItem('refresh-token') ?? "";

    if (localStorageToken) {
      // send another api request to validate token sub is in database?
      // const decoded = jwtDecoderService.decodeToken(localStorageToken);
      // console.log('decoded', decoded);
      this.currentUserSig.set({
        accessToken: localStorageToken,
        refreshToken: refreshStorageToken
      })
    }

  }

  notSignedIn() {
    const signal = this.currentUserSig();
    return signal === undefined ? true : false;
  }
}