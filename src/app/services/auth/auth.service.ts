import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  notSignedIn(){
    const signal = this.currentUserSig();
    console.log('signal', signal);
    console.log('signal condition', signal === undefined ? true : false);
    return signal === undefined ? true : false;
  }
}