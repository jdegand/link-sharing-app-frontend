import { Component, effect, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
//import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  //jwtService = inject(JwtDecoderService);
  router = inject(Router);

  items: MenuItem[] = [];
  //email = '';

  constructor() {

    /*
    const accessToken = this.authService.currentUserSig()?.accessToken;
    if(accessToken){
      const decodedToken = this.jwtService.decodeToken(accessToken);
      //this.email = decodedToken.sub;
      //console.log('split', decodedToken.sub.split('@')[0])
    }
    */

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
            //queryParams: {user: this.email}
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
    localStorage.removeItem('refresh-token');
    this.authService.currentUserSig.set(undefined); // undefined vs null
    this.router.navigate(['/login']);
  }

}
