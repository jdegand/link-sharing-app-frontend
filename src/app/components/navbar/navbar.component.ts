import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: MenuItem[] | undefined;

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
        separator:true
      },
      {
        label: 'Preview',
        icon: 'pi pi-eye',
        routerLink: 'preview'
      }
    ]
  }

}
