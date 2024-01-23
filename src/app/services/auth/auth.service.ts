import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';
import { JwtDecoderService } from '../jwt/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public vs private 
  // behaviourSubject is viable alternative
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  /*
  // persistent login
  // constructor to check jwt token from local storage
  // best to have backend send back expiredIn key separately ?
  // versus having to use a jwt decoder in the frontend to get the expiry date
  // in this case, might need a decoder to get the user data and set that to the currentUserSignal
  // the realworld api sends back a id
  // setting the signal to the id i.e. this.currentUserSig.set(decoded.user.id)
  // can work if you change conditionals to just check if the signal is truthy
  */

  constructor(private jwtDecoderService: JwtDecoderService) {
    const localStorageToken = localStorage.getItem('token') ?? "";

    if (localStorageToken) {
      const decoded = jwtDecoderService.decodeToken(localStorageToken);

      console.log(decoded.user.id);
      this.currentUserSig.set({
        token: localStorageToken,
        id: decoded.user.id,
        email: '',
        username: '',
        password: ''
      })
    }

  }


  notSignedIn() {
    const signal = this.currentUserSig();
    console.log('signal', signal);
    console.log('signal condition', signal === undefined ? true : false);
    return signal === undefined ? true : false;
  }
}