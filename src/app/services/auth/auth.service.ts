import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  signedIn(){
    const signal = this.currentUserSig();
    console.log('signal', signal);
    console.log('signal condition', signal === undefined ? false : true);
    return signal === undefined ? false : true;
  }
}