import { Component, effect, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  items: MenuItem[] = [];

  constructor() {
    effect(() => {

      if (this.authService.currentUserSig()) { 
        this.items = [
          {
            label: 'Profile Details',
            icon: 'pi pi-user-edit',
            routerLink: '/profile',
          },
          {
            label: 'Links',
            icon: 'pi pi-link',
            routerLink: '/links',
          },
          {
            label: 'Preview',
            icon: 'pi pi-eye',
            routerLink: '/preview',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          }
        ]
      } else {
        this.items = [
          {
            label: 'Sign-in',
            icon: 'pi pi-sign-in',
            routerLink: '/login',
            items: [
              {
                label: 'Register',
                routerLink: '/register'
              },
            ]
          },
        ]
      }
    })
  }

  logout() {
    // refactored a few times
    // had a logout method in the authService
    // not really necessary there -> I am not invoking logout method anywhere else in the app

    localStorage.removeItem('token');
    this.authService.currentUserSig.set(undefined); // undefined vs null
    this.router.navigate(['/login']);
  }

}
