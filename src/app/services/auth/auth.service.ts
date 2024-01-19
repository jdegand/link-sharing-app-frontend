import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  logout() {
    localStorage.clear();
    this.currentUserSig.set(null);
    //this.router.navigate(['/home']);
  }
}