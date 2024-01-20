import { Component, Signal, computed, inject } from '@angular/core';
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
  // need to set items to MenuItem to get Intellisense

  authService = inject(AuthService);
  router = inject(Router);

  // make items a computed signal from the authService
  items: Signal<MenuItem[]> = computed(() => {
    if (this.authService.currentUserSig()?.token) {
      return [
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
        {
          label: 'Profile Details',
          icon: 'pi pi-user-edit',
          routerLink: '/profile'
        },
        {
          label: 'Links',
          icon: 'pi pi-link',
          routerLink: '/home'
        },
        {
          label: 'Preview',
          icon: 'pi pi-eye',
          routerLink: '/preview'
        },
        {
          separator: true
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        }
      ]
    } else {
      return [
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

  logout(){
    // could add the route navigation inside the authService
    // need to look up best practices
    // does it really matter?  I don't like the idea of putting router inside a service
    // testing implications?
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

}

/*
// It would have been nice to put the logout inside the menubar.
// The menubar does not seem to respond to changes.
// The authService signal is only evaluated once. The MenuBar uses `OnPush` now for change detection. 
// Since I am using signal, I can't listen to `OnChanges` and recreate the items with an additional menu-item.
// use afterRender, afterNextRender, or afterRenderEffect ?
// Easy option -> move logout functionality inside the Profile details component.
// Also, problems with conditionally rendering the register and login menu-items

import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  authService = inject(AuthService);

  ngOnInit() {
    this.items = [
      {
        label: 'Register',
        icon: 'pi pi-star',
        routerLink: 'register'
      },
      {
        label: 'Sign-in',
        icon: 'pi pi-sign-in',
        routerLink: 'login'
      },
      {
        label: 'Profile Details',
        icon: 'pi pi-user-edit',
        routerLink: 'profile'
      },
      {
        label: 'Links',
        icon: 'pi pi-link',
        routerLink: 'home'
      },
      {
        label: 'Preview',
        icon: 'pi pi-eye',
        routerLink: 'preview'
      },
      {
        separator:true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        visible: this.authService.currentUserSig()?.token !== undefined && this.authService.currentUserSig()?.token !== null
      }
    ]
  }

  logout() {
    console.log(this.authService.currentUserSig()?.token !== undefined && this.authService.currentUserSig()?.token !== null)
    localStorage.clear();
    this.authService.currentUserSig.set(null);
  }
}
*/